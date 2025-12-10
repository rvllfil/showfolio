"use client";

import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { getProfile } from "@/lib/api";
import { Profile } from "@/lib/types";
import Image from "next/image";

interface LogoProps {
  /** Size variant for different use cases */
  size?: "sm" | "lg";
  /** Custom className override */
  className?: string;
  /** Fallback profile data if API call fails */
  fallbackProfile?: Profile;
  /** Whether to show loading state */
  showLoading?: boolean;
  /** Whether to show brand name as fallback when logo is not available */
  showBrandNameFallback?: boolean;
}

interface LogoImageProps {
  src: string;
  alt: string;
  size: "sm" | "lg";
  className?: string;
  onError?: () => void;
}

function LogoImage({ src, alt, size, className, onError }: LogoImageProps) {
  const [imageError, setImageError] = useState(false);

  const sizeClasses = {
    sm: "w-auto h-10", // For navbar
    lg: "w-auto h-24 mx-auto md:h-32", // For hero section
  };

  const combinedClassName = `object-contain ${sizeClasses[size]} ${
    className || ""
  }`;

  if (imageError) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt}
        className={combinedClassName}
        onError={() => onError?.()}
      />
    );
  }

  if (size === "sm") {
    return (
      <Image
        src={src}
        alt={alt}
        width={120}
        height={32}
        className={combinedClassName}
        priority
        unoptimized
        onError={() => setImageError(true)}
      />
    );
  }

  // For large size, use img tag to avoid Next.js Image optimization issues
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={combinedClassName}
      onError={() => onError?.()}
    />
  );
}

export function Logo({
  size = "sm",
  className,
  fallbackProfile,
  showLoading = true,
  showBrandNameFallback = true,
}: LogoProps) {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setMounted(true);

    async function loadProfile() {
      try {
        const response = await getProfile();
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to load profile:", error);
        // Use fallback profile if provided
        if (fallbackProfile) {
          setProfile(fallbackProfile);
        } else {
          // Default fallback
          setProfile({
            brandName: "showfolio",
          } as Profile);
        }
      } finally {
        setLoading(false);
      }
    }

    loadProfile();
  }, [fallbackProfile]);

  // Determine which logo to show based on theme
  const isDarkMode = resolvedTheme === "dark";
  const logoToUse =
    mounted && isDarkMode ? profile?.lightLogo : profile?.darkLogo;
  const fallbackLogo = profile?.lightLogo || profile?.darkLogo;

  // Show loading state
  if (loading && showLoading) {
    const loadingClasses = {
      sm: "w-24 h-8",
      lg: "w-40 h-40 mx-auto md:w-56 md:h-56",
    };

    return (
      <div
        className={`rounded animate-pulse bg-muted ${loadingClasses[size]} ${
          className || ""
        }`}
      />
    );
  }

  // Show logo image if available
  if (logoToUse?.url || fallbackLogo?.url) {
    return (
      <LogoImage
        src={`${process.env.NEXT_PUBLIC_API_URL}${
          (logoToUse || fallbackLogo)?.url
        }`}
        alt={
          (logoToUse || fallbackLogo)?.alternativeText ||
          profile?.brandName ||
          fallbackProfile?.brandName ||
          "Logo"
        }
        size={size}
        className={className}
        onError={() => {
          // Image failed to load, component will use fallback
        }}
      />
    );
  }

  // Fallback to brand name if showBrandNameFallback is true
  if (showBrandNameFallback) {
    const brandName =
      profile?.brandName || fallbackProfile?.brandName || "showfolio";

    if (size === "sm") {
      return (
        <span className={`text-lg font-bold ${className || ""}`}>
          {brandName}
        </span>
      );
    }

    return (
      <h1
        className={`text-5xl font-bold leading-tight md:text-7xl text-foreground ${
          className || ""
        }`}
      >
        {brandName}
      </h1>
    );
  }

  // Return null if no fallback should be shown
  return null;
}

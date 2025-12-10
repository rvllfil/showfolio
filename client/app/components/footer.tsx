"use client";

import Link from "next/link";
import { Github, Linkedin, Mail, Twitter, ArrowUp } from "lucide-react";
import { Logo } from "@/app/components/ui/logo";
import type { Profile } from "@/lib/types";

interface FooterProps {
  profileData?: Profile;
}

export function Footer({ profileData }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const socialIcons: Record<
    string,
    React.ComponentType<{ className?: string }>
  > = {
    github: Github,
    linkedin: Linkedin,
    twitter: Twitter,
    email: Mail,
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="border-t bg-muted/30 border-border">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 lg:py-16">
          <div className="grid gap-8 lg:grid-cols-4">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <div className="mb-6">
                <Logo size="sm" />
              </div>
              <p className="max-w-md mb-6 text-muted-foreground">
                {profileData?.shortInfo ||
                  "Building exceptional web experiences with modern technologies."}
              </p>

              {/* Social Links */}
              {profileData?.socialLinks &&
                profileData.socialLinks.length > 0 && (
                  <div className="flex gap-4">
                    {profileData.socialLinks.map((social) => {
                      const IconComponent =
                        socialIcons[social.iconKey.toLowerCase()] || Mail;
                      return (
                        <Link
                          key={social.id}
                          href={social.url}
                          className="inline-flex items-center justify-center w-10 h-10 transition-colors border rounded-full border-border bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary"
                          aria-label={social.label}
                          target={
                            social.url.startsWith("http") ? "_blank" : undefined
                          }
                          rel={
                            social.url.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          <IconComponent className="w-5 h-5" />
                        </Link>
                      );
                    })}
                  </div>
                )}
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="mb-4 font-semibold">
                {profileData?.footerQuickLinksTitle || "Quick Links"}
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/"
                    className="transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {profileData?.navHomeLabel || "Home"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#about"
                    className="transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {profileData?.navAboutLabel || "About"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#services"
                    className="transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {profileData?.navServicesLabel || "Services"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="/portfolio"
                    className="transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {profileData?.navPortfolioLabel || "Portfolio"}
                  </Link>
                </li>
                <li>
                  <Link
                    href="#contact"
                    className="transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {profileData?.navContactLabel || "Contact"}
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="mb-4 font-semibold">
                {profileData?.footerContactTitle || "Get in Touch"}
              </h3>
              <ul className="space-y-3 text-muted-foreground">
                {profileData?.socialLinks?.find(
                  (link) => link.iconKey.toLowerCase() === "email"
                ) && (
                  <li>
                    <a
                      href={
                        profileData.socialLinks.find(
                          (link) => link.iconKey.toLowerCase() === "email"
                        )?.url
                      }
                      className="transition-colors hover:text-foreground"
                    >
                      {profileData?.footerEmailLabel || "Email Me"}
                    </a>
                  </li>
                )}
                <li>
                  <Link
                    href="/portfolio"
                    className="transition-colors hover:text-foreground"
                  >
                    {profileData?.footerPortfolioLabel || "View Portfolio"}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-sm text-muted-foreground">
              © {currentYear} {profileData?.brandName || "Portfolio"}. All
              rights reserved.
            </p>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center justify-center w-10 h-10 transition-colors border rounded-full border-border bg-background hover:bg-muted"
              aria-label="Scroll to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

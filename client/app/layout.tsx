import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/theme-provider";
import { getProfile } from "@/lib/api";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  let profileData = null;
  try {
    const profile = await getProfile();
    profileData = profile?.data;
  } catch (error) {
    console.warn(
      "Could not fetch profile data during build/runtime, using defaults.",
      error
    );
  }

  // Favicon URL from Strapi - support both media format (v4) and direct url (v5)
  const faviconUrl = profileData?.favicon
    ? profileData.favicon.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${profileData.favicon.url}`
      : profileData.favicon.formats?.thumbnail?.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${profileData.favicon.formats.thumbnail.url}`
      : "/favicon.ico"
    : "/favicon.ico";

  return {
    title: {
      default: `${profileData?.brandName || "Showfolio"}`,
      template: `%s | ${profileData?.brandName || "Showfolio"}`,
    },
    description:
      profileData?.shortInfo ||
      "Full-stack developer specializing in modern web applications, frontend architecture, and user experience design. Building fast, focused, and reliable digital experiences.",
    keywords: [
      "web development",
      "portfolio",
      "full-stack developer",
      "frontend",
      "backend",
      "React",
      "Next.js",
      "TypeScript",
    ],
    authors: [{ name: profileData?.brandName || "showfolio" }],
    creator: profileData?.brandName || "showfolio",
    icons: {
      icon: [
        { url: faviconUrl },
        { url: faviconUrl, sizes: "16x16", type: "image/png" },
        { url: faviconUrl, sizes: "32x32", type: "image/png" },
      ],
      shortcut: faviconUrl,
      apple: faviconUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: "https://showfolio.dev",
      siteName: profileData?.brandName || "Showfolio",
      title: `${
        profileData?.brandName || "Showfolio"
      } – Professional Portfolio & Web Development`,
      description:
        profileData?.shortInfo ||
        "Full-stack developer specializing in modern web applications, frontend architecture, and user experience design.",
    },
    twitter: {
      card: "summary_large_image",
      title: `${
        profileData?.brandName || "Showfolio"
      } – Professional Portfolio`,
      description:
        profileData?.shortInfo ||
        "Full-stack developer specializing in modern web applications and user experience.",
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Fetch profile for favicon in head
  let profileData = null;
  try {
    const profile = await getProfile();
    profileData = profile?.data;
  } catch (error) {
    console.warn("Could not fetch profile for favicon");
  }

  const faviconUrl = profileData?.favicon
    ? profileData.favicon.url
      ? `${process.env.NEXT_PUBLIC_API_URL}${profileData.favicon.url}`
      : "/favicon.ico"
    : "/favicon.ico";

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href={faviconUrl} sizes="any" />
        <link rel="icon" href={faviconUrl} type="image/png" sizes="32x32" />
        <link rel="icon" href={faviconUrl} type="image/png" sizes="16x16" />
        <link rel="apple-touch-icon" href={faviconUrl} />
      </head>
      <body
        className="min-h-screen antialiased bg-background text-foreground"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="flex flex-col min-h-screen">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

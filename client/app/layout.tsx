import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/theme-provider";
import { getProfile } from "@/lib/api";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const profile = await getProfile();
  const profileData = profile?.data;

  // Favicon URL from Strapi or fallback to default
  const faviconUrl = profileData?.favicon
    ? `${process.env.NEXT_PUBLIC_API_URL}${profileData.favicon.url}`
    : "/favicon.ico";

  return {
    title: {
      default: `${
        profileData?.brandName || "Showfolio"
      } – Professional Portfolio & Web Development`,
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
    authors: [{ name: profileData?.brandName || "rvllfil" }],
    creator: profileData?.brandName || "rvllfil",
    icons: {
      icon: faviconUrl,
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className="min-h-screen bg-background text-foreground antialiased"
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={true}
          disableTransitionOnChange
        >
          <div className="flex min-h-screen flex-col">{children}</div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { ThemeProvider } from "@/app/components/theme-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "rvllfil – showfolio",
  description:
    "Portfolio of rvllfil – building fast, focused, and reliable web experiences.",
};

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

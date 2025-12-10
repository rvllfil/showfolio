import type { Metadata } from "next";
import { Navbar } from "@/app/components/navbar";
import { getPortfolioItems, getProfile } from "@/lib/api";
import type { Portfolio } from "@/lib/types";
import { PortfolioPageClient } from "./portfolio-client";

export const metadata: Metadata = {
  title: "Portfolio – All Projects",
  description:
    "Explore my complete collection of web development projects, design systems, and client work. Filter by technology and project type.",
  openGraph: {
    title: "Portfolio – All Projects | Showfolio",
    description:
      "Explore my complete collection of web development projects, design systems, and client work.",
  },
};

export default async function PortfolioPage() {
  let portfolioResponse, profileResponse;
  try {
    [portfolioResponse, profileResponse] = await Promise.all([
      getPortfolioItems(),
      getProfile(),
    ]);
  } catch (error) {
    console.warn(
      "Could not fetch portfolio data during build/runtime, using defaults.",
      error
    );
  }

  const portfolioItems = (portfolioResponse?.data ?? []) as Portfolio[];
  const profileData = profileResponse?.data ?? null;

  return (
    <>
      <Navbar profileData={profileData} />
      <PortfolioPageClient portfolioItems={portfolioItems} />
    </>
  );
}

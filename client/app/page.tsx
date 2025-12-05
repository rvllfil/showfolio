import { getProfile, getFeaturedPortfolio } from "@/lib/api";
import { Navbar } from "@/app/components/navbar";
import { HeroSection } from "@/app/components/hero-section";
import { AboutSection } from "@/app/components/about-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { SkillsSection } from "@/app/components/skills-section";
import { ContactSection } from "@/app/components/contact-section";

export default async function HomePage() {
  const [profile, featuredPortfolio] = await Promise.all([
    getProfile(),
    getFeaturedPortfolio(),
  ]);

  const profileData = profile?.data;
  const featuredItems = featuredPortfolio?.data ?? [];

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-background">
        <HeroSection profileData={profileData} />
        <AboutSection
          profileData={profileData}
          featuredItemsCount={featuredItems.length}
        />
        <ProjectsSection featuredItems={featuredItems} />
        <SkillsSection />
        <ContactSection profileData={profileData} />
      </main>
    </>
  );
}

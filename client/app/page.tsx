import {
  getProfile,
  getFeaturedPortfolio,
  getSkills,
  getTestimonials,
  getServices,
} from "@/lib/api";
import { Navbar } from "@/app/components/navbar";
import { HeroSection } from "@/app/components/hero-section";
import { AboutSection } from "@/app/components/about-section";
import { ServicesSection } from "@/app/components/services-section";
import { ProjectsSection } from "@/app/components/projects-section";
import { SkillsSection } from "@/app/components/skills-section";
import { TestimonialsSection } from "@/app/components/testimonials-section";
import { ContactSection } from "@/app/components/contact-section";
import { Footer } from "@/app/components/footer";

export default async function HomePage() {
  // Fetch all data in parallel for better performance
  let profile, featuredPortfolio, skills, testimonials, services;

  try {
    [profile, featuredPortfolio, skills, testimonials, services] =
      await Promise.all([
        getProfile(),
        getFeaturedPortfolio(),
        getSkills(),
        getTestimonials(),
        getServices(),
      ]);
  } catch (error) {
    console.warn(
      "Could not fetch data during build/runtime, using defaults.",
      error
    );
  }

  const profileData = profile?.data ?? null;
  const featuredItems = featuredPortfolio?.data ?? [];
  const skillsData = skills?.data ?? [];
  const testimonialsData = testimonials?.data ?? [];
  const servicesData = services?.data ?? [];

  return (
    <>
      <Navbar profileData={profileData} />
      <main className="min-h-screen bg-background">
        <HeroSection
          profileData={profileData ?? undefined}
          skillsData={skillsData}
      />
        <AboutSection
          profileData={profileData ?? undefined}
          featuredItemsCount={featuredItems.length}
        />
        {/* Only render Services section if services exist */}
        {servicesData.length > 0 && (
          <ServicesSection
            profileData={profileData ?? undefined}
            servicesData={servicesData}
          />
        )}
        <ProjectsSection
          profileData={profileData ?? undefined}
          featuredItems={featuredItems}
        />
        <SkillsSection
          profileData={profileData ?? undefined}
          skillsData={skillsData}
        />
        {/* Only render Testimonials section if testimonials exist */}
        {testimonialsData.length > 0 && (
          <TestimonialsSection
            profileData={profileData ?? undefined}
            testimonialsData={testimonialsData}
          />
        )}
        <ContactSection profileData={profileData ?? undefined} />
      </main>
      <Footer profileData={profileData ?? undefined} />
    </>
  );
}

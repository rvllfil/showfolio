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
  const [profile, featuredPortfolio, skills, testimonials, services] =
    await Promise.all([
      getProfile(),
      getFeaturedPortfolio(),
      getSkills(),
      getTestimonials(),
      getServices(),
    ]);

  const profileData = profile?.data;
  const featuredItems = featuredPortfolio?.data ?? [];
  const skillsData = skills?.data ?? [];
  const testimonialsData = testimonials?.data ?? [];
  const servicesData = services?.data ?? [];

  return (
    <>
      <Navbar profileData={profileData} />
      <main className="min-h-screen bg-background">
        <HeroSection profileData={profileData} skillsData={skillsData} />
        <AboutSection
          profileData={profileData}
          featuredItemsCount={featuredItems.length}
        />
        {/* Only render Services section if services exist */}
        {servicesData.length > 0 && (
          <ServicesSection
            profileData={profileData}
            servicesData={servicesData}
          />
        )}
        <ProjectsSection
          profileData={profileData}
          featuredItems={featuredItems}
        />
        <SkillsSection profileData={profileData} skillsData={skillsData} />
        {/* Only render Testimonials section if testimonials exist */}
        {testimonialsData.length > 0 && (
          <TestimonialsSection
            profileData={profileData}
            testimonialsData={testimonialsData}
          />
        )}
        <ContactSection profileData={profileData} />
      </main>
      <Footer profileData={profileData} />
    </>
  );
}

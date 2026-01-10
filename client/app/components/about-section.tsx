"use client";

import { motion } from "framer-motion";
import {
  User,
  Briefcase,
  FolderGit2,
  Mail,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Globe,
  Youtube,
  MessageCircle,
} from "lucide-react";
import type { MergedProfileData, StrapiBlock } from "@/lib/types";

interface AboutSectionProps {
  profileData?: MergedProfileData;
  featuredItemsCount: number;
}

export function AboutSection({
  profileData,
  featuredItemsCount,
}: AboutSectionProps) {
  // Icon mapping for social links
  const getIconForSocialLink = (iconKey: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      github: <Github className="w-4 h-4" />,
      linkedin: <Linkedin className="w-4 h-4" />,
      twitter: <Twitter className="w-4 h-4" />,
      instagram: <Instagram className="w-4 h-4" />,
      facebook: <Facebook className="w-4 h-4" />,
      youtube: <Youtube className="w-4 h-4" />,
      website: <Globe className="w-4 h-4" />,
      email: <Mail className="w-4 h-4" />,
      whatsapp: <MessageCircle className="w-4 h-4" />,
    };

    return iconMap[iconKey.toLowerCase()] || <Globe className="w-4 h-4" />;
  };

  return (
    <section
      id="about"
      className="relative px-4 py-24 overflow-hidden bg-background"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute rounded-full top-1/3 -right-12 w-96 h-96 bg-blue-500/10 blur-3xl" />
        <div className="absolute rounded-full bottom-1/3 -left-12 w-96 h-96 bg-primary/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-5xl text-foreground">
            {profileData?.aboutSectionTitle || "About Me"}
          </h2>
          <p className="max-w-3xl mx-auto text-lg md:text-xl text-muted-foreground">
            {profileData?.aboutSectionSubtitle ||
              "Passionate developer crafting exceptional digital experiences"}
          </p>
        </motion.div>

        <div className="grid items-start gap-12 lg:grid-cols-2">
          {/* Left Column - Story */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="space-y-6">
              {profileData?.about ? (
                profileData.about.map((block: StrapiBlock, index: number) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={index}
                        className="text-base leading-relaxed text-muted-foreground md:text-lg"
                      >
                        {block.children
                          ?.map((child) =>
                            child.type === "text" ? child.text : ""
                          )
                          .join("")}
                      </p>
                    );
                  }
                  return null;
                })
              ) : (
                <>
                  <p className="text-base leading-relaxed md:text-lg text-muted-foreground">
                    I&apos;m a passionate developer who loves creating
                    innovative web solutions that solve real-world problems.
                    With a focus on clean code, user experience, and modern
                    technologies, I bring ideas to life through elegant and
                    efficient implementations.
                  </p>
                  <p className="text-base leading-relaxed md:text-lg text-muted-foreground">
                    I enjoy working with the latest technologies and
                    continuously learning new skills to deliver exceptional
                    results. Whether it&apos;s building scalable applications,
                    designing intuitive interfaces, or optimizing performance,
                    I&apos;m committed to excellence in every project.
                  </p>
                </>
              )}
            </div>

            {/* Contact CTA */}
            {profileData?.socialLinks && profileData.socialLinks.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="p-6 mt-8 border rounded-2xl bg-card border-border"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
                    <Mail className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">
                    Let&apos;s Connect
                  </h3>
                </div>
                <p className="mb-4 text-sm text-muted-foreground">
                  Interested in working together? Reach out through any of these
                  platforms.
                </p>
                <div className="flex flex-wrap gap-3">
                  {profileData.socialLinks.map((link, index: number) => (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium transition-all border rounded-lg bg-muted hover:bg-primary/10 border-border hover:border-primary/50 text-foreground hover:text-primary"
                    >
                      {getIconForSocialLink(link.iconKey)}
                      {link.label || link.iconKey}
                    </a>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Right Column - Stats & Highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {profileData?.portfolioNumber &&
              profileData.portfolioNumber.length >= 2 ? (
                // Display first 2 stats from Strapi
                <>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 transition-all border shadow-lg rounded-2xl bg-card border-border hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-primary/10">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                      {profileData.portfolioNumber[0].label}
                    </h4>
                    <p className="text-3xl font-bold text-foreground">
                      {profileData.portfolioNumber[0].value}
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 transition-all border shadow-lg rounded-2xl bg-card border-border hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-blue-500/10">
                      <FolderGit2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                      {profileData.portfolioNumber[1].label}
                    </h4>
                    <p className="text-3xl font-bold text-foreground">
                      {profileData.portfolioNumber[1].value}
                    </p>
                  </motion.div>
                </>
              ) : (
                // Fallback to default stats
                <>
                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 transition-all border shadow-lg rounded-2xl bg-card border-border hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-primary/10">
                      <Briefcase className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                      Experience
                    </h4>
                    <p className="text-3xl font-bold text-foreground">
                      3+ Years
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Professional Work
                    </p>
                  </motion.div>

                  <motion.div
                    whileHover={{ y: -4 }}
                    className="p-6 transition-all border shadow-lg rounded-2xl bg-card border-border hover:shadow-xl"
                  >
                    <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-xl bg-blue-500/10">
                      <FolderGit2 className="w-6 h-6 text-blue-500" />
                    </div>
                    <h4 className="mb-2 text-sm font-semibold text-muted-foreground">
                      Projects
                    </h4>
                    <p className="text-3xl font-bold text-foreground">
                      {featuredItemsCount || 12}+
                    </p>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Successfully Delivered
                    </p>
                  </motion.div>
                </>
              )}
            </div>

            {/* Highlight Card */}
            <motion.div
              whileHover={{ y: -4 }}
              className="p-6 transition-all border shadow-lg rounded-2xl bg-card border-border hover:shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/10">
                  <User className="w-5 h-5 text-green-500" />
                </div>
                <h3 className="text-lg font-semibold text-foreground">
                  What I Do Best
                </h3>
              </div>
              {profileData?.whatIDoList ? (
                <ul className="space-y-3">
                  {profileData.whatIDoList
                    .split("\n")
                    .filter((line) => line.trim().startsWith("-"))
                    .map((line, index) => {
                      // Remove leading dash and trim
                      const text = line.trim().replace(/^-\s*/, "");
                      return (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                          <span className="text-sm text-muted-foreground">
                            {text}
                          </span>
                        </li>
                      );
                    })}
                </ul>
              ) : (
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Building responsive, performant web applications
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Crafting intuitive user interfaces and experiences
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 shrink-0" />
                    <span className="text-sm text-muted-foreground">
                      Implementing modern frontend and backend architectures
                    </span>
                  </li>
                </ul>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

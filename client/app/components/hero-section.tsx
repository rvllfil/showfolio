"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Code, Palette, Zap, Star } from "lucide-react";
import { Profile, Skill } from "@/lib/types";

interface HeroSectionProps {
  profileData?: Profile;
  skillsData?: Skill[];
}

export function HeroSection({ profileData, skillsData }: HeroSectionProps) {
  return (
    <section
      id="home"
      className="relative flex items-center min-h-screen pt-20 bg-linear-to-b from-background via-background to-muted/20"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute rounded-full -top-40 -right-40 w-80 h-80 bg-primary/5 blur-3xl"></div>
        <div className="absolute rounded-full -bottom-40 -left-40 w-80 h-80 bg-blue-500/5 blur-3xl"></div>
      </div>

      <div className="container relative z-10 px-4 py-20 mx-auto sm:px-6 lg:px-8">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Content */}
          <div className="space-y-8 lg:col-span-7">
            {/* Badge */}
            {profileData?.heroAvailabilityText && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center px-4 py-2 space-x-2 text-sm font-medium border rounded-full border-border bg-muted/50 text-muted-foreground"
              >
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                <span>{profileData.heroAvailabilityText}</span>
              </motion.div>
            )}

            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="space-y-6"
            >
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                {profileData?.brandName ? (
                  <>
                    <span className="block">Hi, I&apos;m</span>
                    <span className="block text-primary">
                      {profileData.brandName}
                    </span>
                  </>
                ) : (
                  <>
                    <span className="block">Building</span>
                    <span className="block text-primary">exceptional</span>
                    <span className="block">web experiences</span>
                  </>
                )}
              </h1>

              <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
                {profileData?.tagline ||
                  "Full-stack developer specializing in modern web technologies. I create fast, scalable, and user-friendly applications that solve real business problems."}
              </p>
            </motion.div>

            {/* Stats */}
            {profileData?.portfolioNumber &&
              profileData.portfolioNumber.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="grid grid-cols-3 gap-8 py-8 border-y border-border"
                >
                  {profileData.portfolioNumber.slice(0, 3).map((stat) => (
                    <div key={stat.id}>
                      <div className="text-2xl font-bold">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col gap-4 sm:flex-row"
            >
              {profileData?.primaryCtaUrl && (
                <Link
                  href={profileData.primaryCtaUrl}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all rounded-full shadow-lg bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 hover:shadow-xl"
                >
                  {profileData.primaryCtaLabel || "View My Work"}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              )}
              {profileData?.secondaryCtaUrl && (
                <Link
                  href={profileData.secondaryCtaUrl}
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-all border rounded-full shadow-md border-input bg-background hover:bg-accent hover:text-accent-foreground hover:scale-105"
                >
                  {profileData.secondaryCtaLabel || "Get in Touch"}
                </Link>
              )}
            </motion.div>

            {/* Skills Preview */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-2"
            >
              {skillsData && skillsData.length > 0 ? (
                skillsData.slice(0, 6).map((skill) => {
                  // Map category to icon
                  const iconMap: Record<string, React.ReactNode> = {
                    frontend: <Code className="w-3 h-3" />,
                    backend: <Code className="w-3 h-3" />,
                    uiux: <Palette className="w-3 h-3" />,
                    mobile: <Code className="w-3 h-3" />,
                    devops: <Zap className="w-3 h-3" />,
                    tools: <Zap className="w-3 h-3" />,
                  };

                  return (
                    <span
                      key={skill.documentId}
                      className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium border rounded-full border-border bg-background"
                    >
                      {iconMap[skill.category] || <Code className="w-3 h-3" />}
                      {skill.name}
                    </span>
                  );
                })
              ) : (
                // Fallback skills
                <>
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium border rounded-full border-border bg-background">
                    <Code className="w-3 h-3" />
                    React & Next.js
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium border rounded-full border-border bg-background">
                    <Zap className="w-3 h-3" />
                    TypeScript
                  </span>
                  <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium border rounded-full border-border bg-background">
                    <Palette className="w-3 h-3" />
                    UI/UX Design
                  </span>
                </>
              )}
            </motion.div>
          </div>

          {/* Visual Element */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Background decorations */}
              <div className="absolute rounded-full -top-4 -left-4 w-72 h-72 bg-primary/10 blur-2xl animate-pulse"></div>

              {/* Main card */}
              <div className="relative p-6 border shadow-2xl rounded-2xl border-border bg-card">
                {/* Browser chrome */}
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                  <div className="flex-1 text-center">
                    <div className="inline-block px-3 py-1 text-xs rounded-full bg-muted">
                      portfolio.dev
                    </div>
                  </div>
                </div>

                {/* Profile section */}
                <div className="pt-6">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <Image
                        src={
                          profileData?.profileImage
                            ? `${process.env.NEXT_PUBLIC_API_URL}${profileData.profileImage.url}`
                            : "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80"
                        }
                        alt={profileData?.brandName || "Profile"}
                        width={60}
                        height={60}
                        className="border-2 rounded-full border-border object-cover"
                        unoptimized
                      />
                      <div className="absolute w-4 h-4 bg-green-500 border-2 rounded-full -bottom-1 -right-1 border-card"></div>
                    </div>
                    <div>
                      <h3 className="font-semibold">
                        {profileData?.brandName || "Developer"}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {profileData?.title || "Full-Stack Developer"}
                      </p>
                    </div>
                  </div>

                  {/* Code snippet */}
                  <div className="p-4 space-y-2 font-mono text-xs rounded-lg bg-muted/50">
                    <div className="text-muted-foreground">
                      {"// Currently building"}
                    </div>
                    <div>
                      <span className="text-blue-600 dark:text-blue-400">
                        const
                      </span>{" "}
                      <span className="text-purple-600 dark:text-purple-400">
                        project
                      </span>{" "}
                      <span className="text-muted-foreground">=</span>{" "}
                      <span className="text-green-600 dark:text-green-400">
                        &quot;amazing-web-app&quot;
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                      <span className="text-muted-foreground text-[10px]">
                        Building with passion
                      </span>
                    </div>
                  </div>

                  {/* Activity indicators */}
                  <div className="flex items-center justify-between pt-4 mt-6 border-t border-border">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-muted-foreground">
                        Active now
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Response: ~2 hours
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute flex items-center justify-center w-16 h-16 rounded-full -top-8 -right-8 bg-primary/20"
              >
                <Code className="w-8 h-8 text-primary" />
              </motion.div>
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute flex items-center justify-center w-12 h-12 rounded-full -bottom-4 -left-8 bg-blue-500/20"
              >
                <Zap className="w-6 h-6 text-blue-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Server,
  Wrench,
  Palette,
  Smartphone,
  Cloud,
} from "lucide-react";
import type { MergedProfileData, Skill } from "@/lib/types";

interface SkillsSectionProps {
  profileData?: MergedProfileData;
  skillsData?: Skill[];
}

export function SkillsSection({ profileData, skillsData }: SkillsSectionProps) {
  // Group skills by category if we have Strapi data
  const groupedSkills =
    skillsData && skillsData.length > 0
      ? {
          frontend: skillsData.filter((s) => s.category === "frontend"),
          backend: skillsData.filter((s) => s.category === "backend"),
          uiux: skillsData.filter((s) => s.category === "uiux"),
          mobile: skillsData.filter((s) => s.category === "mobile"),
          devops: skillsData.filter((s) => s.category === "devops"),
          tools: skillsData.filter((s) => s.category === "tools"),
        }
      : null;

  const skills = groupedSkills
    ? [
        {
          category: "Frontend",
          icon: Code2,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20",
          items: groupedSkills.frontend.map((s) => s.name),
        },
        {
          category: "Backend",
          icon: Server,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20",
          items: groupedSkills.backend.map((s) => s.name),
        },
        {
          category: "UI/UX",
          icon: Palette,
          color: "text-pink-500",
          bgColor: "bg-pink-500/10",
          borderColor: "border-pink-500/20",
          items: groupedSkills.uiux.map((s) => s.name),
        },
        {
          category: "Mobile",
          icon: Smartphone,
          color: "text-orange-500",
          bgColor: "bg-orange-500/10",
          borderColor: "border-orange-500/20",
          items: groupedSkills.mobile.map((s) => s.name),
        },
        {
          category: "DevOps",
          icon: Cloud,
          color: "text-cyan-500",
          bgColor: "bg-cyan-500/10",
          borderColor: "border-cyan-500/20",
          items: groupedSkills.devops.map((s) => s.name),
        },
        {
          category: "Tools",
          icon: Wrench,
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/20",
          items: groupedSkills.tools.map((s) => s.name),
        },
      ].filter((cat) => cat.items.length > 0) // Only show categories with skills
    : [
        {
          category: "Frontend",
          icon: Code2,
          color: "text-blue-500",
          bgColor: "bg-blue-500/10",
          borderColor: "border-blue-500/20",
          items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
        },
        {
          category: "Backend",
          icon: Server,
          color: "text-green-500",
          bgColor: "bg-green-500/10",
          borderColor: "border-green-500/20",
          items: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
        },
        {
          category: "Tools",
          icon: Wrench,
          color: "text-purple-500",
          bgColor: "bg-purple-500/10",
          borderColor: "border-purple-500/20",
          items: ["Docker", "AWS", "Git", "Figma"],
        },
      ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="skills"
      className="py-24 px-4 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {profileData?.skillsSectionTitle || "Technical Skills"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {profileData?.skillsSectionSubtitle ||
              "A comprehensive toolkit of technologies and tools I use to build exceptional digital experiences"}
          </p>
        </motion.div>

        {/* Skills Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-8"
        >
          {skills.map((skillCategory, index) => {
            const Icon = skillCategory.icon;
            return (
              <motion.div
                key={index}
                variants={item}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="h-full p-8 rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500">
                  {/* Icon Header */}
                  <div className="flex items-center gap-4 mb-6">
                    <div
                      className={`w-14 h-14 rounded-xl ${skillCategory.bgColor} flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300`}
                    >
                      <Icon className={`w-7 h-7 ${skillCategory.color}`} />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground">
                      {skillCategory.category}
                    </h3>
                  </div>

                  {/* Skills List */}
                  <div className="flex flex-wrap gap-2">
                    {skillCategory.items.map((skill, skillIndex) => (
                      <motion.span
                        key={skillIndex}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: skillIndex * 0.1 }}
                        whileHover={{ scale: 1.05 }}
                        className={`px-4 py-2 rounded-lg ${skillCategory.bgColor} ${skillCategory.color} border ${skillCategory.borderColor} font-medium text-sm hover:shadow-md transition-all cursor-default`}
                      >
                        {skill}
                      </motion.span>
                    ))}
                  </div>

                  {/* Hover indicator */}
                  <div
                    className={`mt-6 h-1 ${skillCategory.bgColor} rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left`}
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            Always learning and exploring new technologies to stay ahead of the
            curve
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <span className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground">
              Continuous Learning
            </span>
            <span className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground">
              Best Practices
            </span>
            <span className="px-4 py-2 rounded-full bg-card border border-border text-sm font-medium text-muted-foreground">
              Clean Code
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

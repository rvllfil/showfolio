"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import type { Portfolio, MergedProfileData } from "@/lib/types";

interface ProjectsSectionProps {
  profileData?: MergedProfileData;
  featuredItems: Portfolio[];
}

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

export function ProjectsSection({
  profileData,
  featuredItems,
}: ProjectsSectionProps) {
  return (
    <section
      id="portfolio"
      className="py-24 px-4 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -left-12 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-12 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {profileData?.projectsSectionTitle || "Featured Projects"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {profileData?.projectsSectionSubtitle ||
              "A showcase of my recent work spanning web applications, design systems, and full-stack solutions"}
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12"
        >
          {featuredItems?.slice(0, 3).map((project, index: number) => (
            <motion.div
              key={project.id}
              variants={item}
              whileHover={{ y: -8 }}
              className="group"
            >
              <Link href={`/portfolio/${project.slug}`} className="block">
                <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-lg hover:shadow-2xl transition-all duration-500 h-full">
                  {/* Thumbnail */}
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {project.thumbnail?.url ? (
                      <Image
                        src={`${process.env.NEXT_PUBLIC_API_URL}${project.thumbnail.url}`}
                        alt={project.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-linear-to-br from-primary/20 to-blue-500/20">
                        <div className="text-center">
                          <div className="w-16 h-16 rounded-2xl bg-primary/30 mx-auto mb-3 flex items-center justify-center">
                            <ExternalLink className="w-8 h-8 text-primary" />
                          </div>
                          <p className="text-sm text-muted-foreground font-medium">
                            Preview Unavailable
                          </p>
                        </div>
                      </div>
                    )}
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center gap-3">
                      {project.liveUrl && (
                        <motion.div
                          initial={{ scale: 0, rotate: -180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.2 }}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                            <ExternalLink className="w-5 h-5 text-gray-900" />
                          </div>
                        </motion.div>
                      )}
                      {project.githubUrl && (
                        <motion.div
                          initial={{ scale: 0, rotate: 180 }}
                          whileInView={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3 }}
                          className="opacity-0 group-hover:opacity-100"
                        >
                          <div className="w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center hover:scale-110 transition-transform">
                            <Github className="w-5 h-5 text-gray-900" />
                          </div>
                        </motion.div>
                      )}
                    </div>

                    {/* Portfolio type badge */}
                    {project.portfolioType && (
                      <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-md border border-white/10">
                        <span className="text-xs font-semibold text-white uppercase tracking-wide">
                          {project.portfolioType}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2 leading-relaxed">
                      {project.shortDescription ||
                        "Explore this project to see the implementation details and technologies used."}
                    </p>

                    {/* Tech tags */}
                    <div className="flex flex-wrap gap-2">
                      {project.techTags
                        ?.slice(0, 4)
                        .map((tech, techIndex: number) => (
                          <span
                            key={techIndex}
                            className="px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20 hover:bg-primary/20 transition-colors"
                          >
                            {tech.name}
                          </span>
                        ))}
                      {project.techTags?.length > 4 && (
                        <span className="px-3 py-1 text-xs font-medium bg-muted text-muted-foreground rounded-full border border-border">
                          +{project.techTags.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Hover indicator */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-primary bg-background border-2 border-primary rounded-xl font-semibold hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 group"
          >
            View All Projects
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

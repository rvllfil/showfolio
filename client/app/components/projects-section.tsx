"use client";

import Image from "next/image";
import Link from "next/link";

interface ProjectsSectionProps {
  featuredItems: any[];
}

export function ProjectsSection({ featuredItems }: ProjectsSectionProps) {
  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Featured Projects
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            A collection of my latest work showcasing different technologies and
            approaches
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredItems?.slice(0, 3).map((project: any) => (
            <div key={project.id} className="group">
              <div className="relative overflow-hidden rounded-2xl bg-card border border-border shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="aspect-video bg-muted relative overflow-hidden">
                  {project.thumbnail?.url ? (
                    <Image
                      src={`http://localhost:1337${project.thumbnail.url}`}
                      alt={project.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      <div className="text-center">
                        <div className="w-12 h-12 rounded-lg bg-slate-300 mx-auto mb-2"></div>
                        <p className="text-sm">No Image</p>
                      </div>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>

                <div className="p-6">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techTags
                      ?.slice(0, 3)
                      .map((tech: any, techIndex: number) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-md border border-primary/20"
                        >
                          {tech.name}
                        </span>
                      ))}
                  </div>

                  <Link
                    href={`/portfolio/${project.slug}`}
                    className="inline-flex items-center text-primary font-medium text-sm hover:text-primary/80 transition-colors"
                  >
                    View Project
                    <span className="ml-1 group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center justify-center px-8 py-4 text-primary bg-background border-2 border-primary rounded-xl font-medium hover:bg-primary hover:text-primary-foreground transition-all duration-200 shadow-md hover:shadow-lg"
          >
            View All Projects
          </Link>
        </div>
      </div>
    </section>
  );
}

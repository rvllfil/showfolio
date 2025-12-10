"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Filter, X, ExternalLink } from "lucide-react";
import type { Portfolio } from "@/lib/types";

interface PortfolioPageClientProps {
  portfolioItems: Portfolio[];
}

export function PortfolioPageClient({
  portfolioItems,
}: PortfolioPageClientProps) {
  const [selectedType, setSelectedType] = useState<string>("all");
  const [selectedTech, setSelectedTech] = useState<string>("all");
  const [showFilters, setShowFilters] = useState(false);

  // Extract unique portfolio types
  const portfolioTypes = useMemo(() => {
    const types = new Set<string>();
    portfolioItems.forEach((item) => {
      if (item.portfolioType) types.add(item.portfolioType);
    });
    return Array.from(types).sort();
  }, [portfolioItems]);

  // Extract unique tech tags
  const techTags = useMemo(() => {
    const tags = new Set<string>();
    portfolioItems.forEach((item) => {
      item.techTags?.forEach((tag) => {
        if (tag.name) tags.add(tag.name);
      });
    });
    return Array.from(tags).sort();
  }, [portfolioItems]);

  // Filter portfolio items
  const filteredItems = useMemo(() => {
    return portfolioItems.filter((item) => {
      const typeMatch =
        selectedType === "all" || item.portfolioType === selectedType;
      const techMatch =
        selectedTech === "all" ||
        item.techTags?.some((tag) => tag.name === selectedTech);
      return typeMatch && techMatch;
    });
  }, [portfolioItems, selectedType, selectedTech]);

  const clearFilters = () => {
    setSelectedType("all");
    setSelectedTech("all");
  };

  const hasActiveFilters = selectedType !== "all" || selectedTech !== "all";

  return (
    <main className="px-4 py-12 mx-auto max-w-7xl md:py-20">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-12 text-center"
      >
        <h1 className="mb-4 text-4xl font-bold md:text-5xl text-foreground">
          Portfolio
        </h1>
        <p className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground">
          Explore my collection of web development projects, design systems, and
          client work
        </p>
      </motion.div>

      {/* Filter Toggle Button (Mobile) */}
      <div className="mb-6 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors border rounded-lg bg-card border-border hover:bg-muted"
        >
          <Filter className="w-4 h-4" />
          Filters
          {hasActiveFilters && (
            <span className="w-2 h-2 rounded-full bg-primary" />
          )}
        </button>
      </div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`mb-8 p-6 bg-card border border-border rounded-xl ${
          showFilters ? "block" : "hidden md:block"
        }`}
      >
        <div className="flex flex-col gap-6 md:flex-row">
          {/* Portfolio Type Filter */}
          <div className="flex-1">
            <label className="block mb-3 text-sm font-semibold text-foreground">
              Project Type
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedType("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedType === "all"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All
              </button>
              {portfolioTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all capitalize ${
                    selectedType === type
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Tech Filter */}
          <div className="flex-1">
            <label className="block mb-3 text-sm font-semibold text-foreground">
              Technology
            </label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTech("all")}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedTech === "all"
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                All
              </button>
              {techTags.slice(0, 8).map((tech) => (
                <button
                  key={tech}
                  onClick={() => setSelectedTech(tech)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedTech === tech
                      ? "bg-primary text-primary-foreground shadow-md"
                      : "bg-muted text-muted-foreground hover:bg-muted/80"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Clear Filters */}
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="inline-flex items-center gap-2 mt-4 text-sm transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
            Clear all filters
          </button>
        )}
      </motion.div>

      {/* Results count */}
      <div className="mb-6 text-sm text-muted-foreground">
        Showing {filteredItems.length}{" "}
        {filteredItems.length === 1 ? "project" : "projects"}
      </div>

      {/* Portfolio Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredItems.map((portfolioItem) => (
          <motion.div
            key={portfolioItem.documentId}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -8 }}
            className="group"
          >
            <Link
              href={`/portfolio/${portfolioItem.slug}`}
              className="block h-full overflow-hidden transition-all border rounded-2xl bg-card hover:shadow-2xl"
            >
              {/* Thumbnail */}
              <div className="relative overflow-hidden aspect-video bg-muted">
                {portfolioItem.thumbnail?.url ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${portfolioItem.thumbnail.url}`}
                    alt={
                      portfolioItem.thumbnail.alternativeText ||
                      portfolioItem.title
                    }
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-linear-to-br from-primary/20 to-blue-500/20">
                    <ExternalLink className="w-12 h-12 text-primary/50" />
                  </div>
                )}

                {/* Gradient overlay */}
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-linear-to-t from-black/50 to-transparent group-hover:opacity-100" />

                {/* Featured badge */}
                {portfolioItem.isFeatured && (
                  <div className="absolute px-3 py-1 text-xs font-bold tracking-wide uppercase rounded-full shadow-lg top-3 right-3 bg-primary text-primary-foreground">
                    Featured
                  </div>
                )}

                {/* Portfolio type badge */}
                {portfolioItem.portfolioType && (
                  <div className="absolute px-3 py-1 border rounded-full top-3 left-3 bg-black/50 backdrop-blur-md border-white/10">
                    <span className="text-xs font-semibold tracking-wide text-white uppercase">
                      {portfolioItem.portfolioType}
                    </span>
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-5">
                {/* Year */}
                {portfolioItem.year && (
                  <div className="mb-2 text-xs font-medium text-muted-foreground">
                    {portfolioItem.year}
                  </div>
                )}

                {/* Title */}
                <h3 className="mb-2 text-xl font-bold transition-colors group-hover:text-primary line-clamp-1">
                  {portfolioItem.title}
                </h3>

                {/* Description */}
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground line-clamp-2">
                  {portfolioItem.shortDescription ||
                    "Click to view project details and implementation."}
                </p>

                {/* Tech Tags */}
                {portfolioItem.techTags &&
                  portfolioItem.techTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {portfolioItem.techTags.slice(0, 3).map(
                        (tag, tagIndex) =>
                          tag.name && (
                            <span
                              key={tagIndex}
                              className="px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium border border-primary/20"
                            >
                              {tag.name}
                            </span>
                          )
                      )}
                      {portfolioItem.techTags.length > 3 && (
                        <span className="px-2.5 py-1 text-xs text-muted-foreground font-medium">
                          +{portfolioItem.techTags.length - 3}
                        </span>
                      )}
                    </div>
                  )}
              </div>

              {/* Hover indicator */}
              <div className="h-1 transition-transform duration-500 origin-left scale-x-0 bg-primary group-hover:scale-x-100" />
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-20 text-center"
        >
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-muted">
            <Filter className="w-10 h-10 text-muted-foreground" />
          </div>
          <h3 className="mb-2 text-xl font-semibold text-foreground">
            No projects found
          </h3>
          <p className="mb-6 text-muted-foreground">
            Try adjusting your filters to see more results
          </p>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="px-6 py-3 font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
            >
              Clear Filters
            </button>
          )}
        </motion.div>
      )}
    </main>
  );
}

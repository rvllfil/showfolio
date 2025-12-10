"use client";

import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import Image from "next/image";
import type { Testimonial, Profile } from "@/lib/types";
import { renderBlocksAsText } from "@/lib/strapi-helpers";

// Placeholder testimonials - use when no Strapi data available
const placeholderTestimonials = [
  {
    id: 1,
    documentId: "placeholder-1",
    name: "Sarah Chen",
    role: "Product Manager",
    company: "TechCorp",
    quote:
      "Outstanding work on our dashboard redesign. The attention to detail and performance optimizations exceeded our expectations. Highly recommend for any serious web project.",
    avatar:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?auto=format&fit=crop&w=150&q=80",
    featured: true,
    order: 1,
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
  },
  {
    id: 2,
    documentId: "placeholder-2",
    name: "Michael Rodriguez",
    role: "CTO",
    company: "StartupX",
    quote:
      "Delivered a beautiful, fast-loading website that perfectly captured our brand. Great communication throughout the project and delivered on time.",
    avatar:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80",
    featured: true,
    order: 2,
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
  },
  {
    id: 3,
    documentId: "placeholder-3",
    name: "Emily Johnson",
    role: "Design Director",
    company: "Creative Agency",
    quote:
      "Exceptional frontend development skills. Translated our complex designs into pixel-perfect, interactive experiences that our clients love.",
    avatar:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&w=150&q=80",
    featured: true,
    order: 3,
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
  },
  {
    id: 4,
    documentId: "placeholder-4",
    name: "David Kim",
    role: "Founder",
    company: "E-commerce Plus",
    quote:
      "The e-commerce platform exceeded all our expectations. Clean code, excellent performance, and great attention to user experience details.",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80",
    featured: true,
    order: 4,
    createdAt: "",
    updatedAt: "",
    publishedAt: "",
  },
];

interface TestimonialsSectionProps {
  profileData?: Profile;
  testimonialsData?: Testimonial[];
}

export function TestimonialsSection({
  profileData,
  testimonialsData,
}: TestimonialsSectionProps) {
  const testimonials =
    testimonialsData && testimonialsData.length > 0
      ? testimonialsData
      : placeholderTestimonials;
  return (
    <section className="py-24 bg-background">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">
            {profileData?.testimonialsSectionTitle || "What Clients Say"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {profileData?.testimonialsSectionSubtitle ||
              "Don't just take my word for it. Here's what clients have to say about working with me."}
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid gap-8 md:grid-cols-2 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="relative rounded-2xl border border-border bg-card p-8 hover:shadow-lg transition-all duration-300"
            >
              {/* Quote Icon */}
              <div className="absolute top-8 right-8 opacity-10">
                <Quote className="w-12 h-12" />
              </div>

              {/* Content */}
              <blockquote className="text-muted-foreground mb-6 leading-relaxed relative z-10">
                &ldquo;
                {typeof testimonial.quote === "string"
                  ? testimonial.quote
                  : renderBlocksAsText(testimonial.quote)}
                &rdquo;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-4">
                {testimonial.avatar && (
                  <div className="relative w-12 h-12 rounded-full overflow-hidden border border-border">
                    <Image
                      src={
                        typeof testimonial.avatar === "string"
                          ? testimonial.avatar
                          : `${process.env.NEXT_PUBLIC_API_URL}${testimonial.avatar.url}`
                      }
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

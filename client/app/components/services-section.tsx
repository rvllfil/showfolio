"use client";

import { motion } from "framer-motion";
import {
  Code,
  Palette,
  Server,
  Database,
  Smartphone,
  Cloud,
  Globe,
  Shield,
  Layers,
  Sparkles,
  CheckCircle,
} from "lucide-react";
import type { MergedProfileData, Service } from "@/lib/types";
import { renderBlocksAsText } from "@/lib/strapi-helpers";

interface ServicesSectionProps {
  profileData?: MergedProfileData;
  servicesData: Service[]; // Required, but HomePage ensures it's not empty
}

export function ServicesSection({
  profileData,
  servicesData,
}: ServicesSectionProps) {
  // Icon mapping - Maps Strapi icon keys to Lucide React components
  const iconMap: Record<string, typeof Code> = {
    code: Code, // Web Development, Backend, Frontend
    palette: Palette, // UI/UX Design
    server: Server, // API / Backend / DevOps
    database: Database, // Database / Data Engineering
    smartphone: Smartphone, // Mobile App Development
    cloud: Cloud, // Cloud Services / Deployment
    globe: Globe, // Web Apps / SaaS / Global Reach
    shield: Shield, // Security / Audit / Compliance
    layers: Layers, // System Architecture / Integration
    sparkles: Sparkles, // Innovation / Consulting / Creative
  };

  // Map Strapi services to component format
  const services = servicesData.map((service) => ({
    icon: iconMap[service.icon?.toLowerCase() || "code"] || Code,
    title: service.title,
    description:
      renderBlocksAsText(service.description) || service.short_description,
    features: service.short_description
      ? service.short_description.split("\n").filter(Boolean)
      : [],
  }));

  return (
    <section id="services" className="py-24 bg-muted/30">
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
            {profileData?.servicesSectionTitle || "What I Do"}
          </h2>
          <p className="text-lg text-muted-foreground">
            {profileData?.servicesSectionSubtitle ||
              "I specialize in building modern web applications with a focus on performance, user experience, and scalable architecture."}
          </p>
        </motion.div>

        {/* Services Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => {
            const IconComponent = service.icon;

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group relative rounded-2xl border border-border bg-card p-6 hover:shadow-lg transition-shadow duration-300"
              >
                {/* Icon */}
                <div className="mb-6">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <IconComponent className="w-6 h-6" />
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-start text-sm">
                        <CheckCircle className="w-4 h-4 text-primary mr-2 shrink-0 mt-0.5" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

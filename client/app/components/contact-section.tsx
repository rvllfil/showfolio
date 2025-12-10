"use client";

import { motion } from "framer-motion";
import {
  Mail,
  MessageSquare,
  Calendar,
  Zap,
  Clock,
  Shield,
  Github,
  Linkedin,
  Twitter,
  Instagram,
  Facebook,
  Youtube,
  Globe,
  Send,
} from "lucide-react";

interface ContactSectionProps {
  profileData?: any;
}

export function ContactSection({ profileData }: ContactSectionProps) {
  const handleContactClick = () => {
    console.log("Contact clicked");
  };

  // Icon mapping for social platforms
  const getIconForPlatform = (platform: string) => {
    const platformLower = platform.toLowerCase();

    if (platformLower.includes("github")) return Github;
    if (platformLower.includes("linkedin")) return Linkedin;
    if (platformLower.includes("twitter") || platformLower.includes("x.com"))
      return Twitter;
    if (platformLower.includes("instagram")) return Instagram;
    if (platformLower.includes("facebook")) return Facebook;
    if (platformLower.includes("youtube")) return Youtube;
    if (platformLower.includes("mail") || platformLower.includes("email"))
      return Mail;
    if (
      platformLower.includes("whatsapp") ||
      platformLower.includes("telegram")
    )
      return Send;
    if (
      platformLower.includes("website") ||
      platformLower.includes("portfolio")
    )
      return Globe;

    return Globe; // Default icon
  };

  // Color mapping for social platforms
  const getColorForPlatform = (platform: string) => {
    const platformLower = platform.toLowerCase();

    if (platformLower.includes("github"))
      return {
        text: "hover:text-[#333] dark:hover:text-white",
        bg: "hover:bg-[#333]/10",
        border: "hover:border-[#333]/30",
      };
    if (platformLower.includes("linkedin"))
      return {
        text: "hover:text-[#0A66C2]",
        bg: "hover:bg-[#0A66C2]/10",
        border: "hover:border-[#0A66C2]/30",
      };
    if (platformLower.includes("twitter") || platformLower.includes("x.com"))
      return {
        text: "hover:text-[#1DA1F2]",
        bg: "hover:bg-[#1DA1F2]/10",
        border: "hover:border-[#1DA1F2]/30",
      };
    if (platformLower.includes("instagram"))
      return {
        text: "hover:text-[#E4405F]",
        bg: "hover:bg-[#E4405F]/10",
        border: "hover:border-[#E4405F]/30",
      };
    if (platformLower.includes("facebook"))
      return {
        text: "hover:text-[#1877F2]",
        bg: "hover:bg-[#1877F2]/10",
        border: "hover:border-[#1877F2]/30",
      };
    if (platformLower.includes("youtube"))
      return {
        text: "hover:text-[#FF0000]",
        bg: "hover:bg-[#FF0000]/10",
        border: "hover:border-[#FF0000]/30",
      };
    if (platformLower.includes("mail") || platformLower.includes("email"))
      return {
        text: "hover:text-blue-500",
        bg: "hover:bg-blue-500/10",
        border: "hover:border-blue-500/30",
      };
    if (platformLower.includes("whatsapp"))
      return {
        text: "hover:text-[#25D366]",
        bg: "hover:bg-[#25D366]/10",
        border: "hover:border-[#25D366]/30",
      };

    return {
      text: "hover:text-primary",
      bg: "hover:bg-primary/10",
      border: "hover:border-primary/30",
    };
  };

  const benefits = [
    {
      icon: Clock,
      title: profileData?.contactBenefitsTitle1 || "Quick Response",
      description:
        profileData?.contactBenefitsDescription1 || "Usually within 24 hours",
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
    },
    {
      icon: Shield,
      title: profileData?.contactBenefitsTitle2 || "Free Consultation",
      description:
        profileData?.contactBenefitsDescription2 || "No commitment required",
      color: "text-green-500",
      bgColor: "bg-green-500/10",
    },
    {
      icon: Zap,
      title: profileData?.contactBenefitsTitle3 || "Fast Turnaround",
      description:
        profileData?.contactBenefitsDescription3 ||
        "Efficient project delivery",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 px-4 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-br from-primary to-blue-500 text-white text-2xl font-bold mb-6 shadow-xl">
            <Mail className="w-8 h-8" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {profileData?.contactSectionTitle || "Let's Work Together"}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {profileData?.contactSectionDescription ||
              "Have a project in mind? I'd love to hear about it and help bring your ideas to life."}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="grid md:grid-cols-3 gap-6 mb-12"
        >
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={index}
                whileHover={{ y: -4 }}
                className="p-6 rounded-2xl bg-card border border-border shadow-lg hover:shadow-xl transition-all"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${benefit.bgColor} flex items-center justify-center mb-4`}
                >
                  <Icon className={`w-6 h-6 ${benefit.color}`} />
                </div>
                <h4 className="font-semibold text-foreground mb-2">
                  {benefit.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {benefit.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="p-8 md:p-12 rounded-3xl bg-linear-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 shadow-2xl mb-12"
        >
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              {profileData?.contactCtaTitle || "Ready to Start Your Project?"}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              {profileData?.contactCtaDescription ||
                "Let's discuss your ideas and see how we can collaborate to create something amazing together."}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-semibold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-xl"
              >
                <MessageSquare className="w-5 h-5" />
                {profileData?.contactPrimaryButtonLabel || "Send Message"}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleContactClick}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-background border-2 border-border text-foreground font-semibold rounded-xl hover:bg-muted transition-all shadow-lg hover:shadow-xl"
              >
                <Calendar className="w-5 h-5" />
                {profileData?.contactSecondaryButtonLabel || "Schedule Call"}
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Social Links */}
        {profileData?.socialLinks && profileData.socialLinks.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <div className="p-8 rounded-2xl bg-card border border-border shadow-lg">
              <h3 className="text-xl font-semibold text-foreground mb-3 text-center">
                {profileData?.contactSocialTitle || "Connect With Me"}
              </h3>
              <p className="text-sm text-muted-foreground mb-6 text-center">
                {profileData?.contactSocialDescription ||
                  "Follow me on social media or drop me a message"}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {profileData.socialLinks.map((link: any, index: number) => {
                  const platformName =
                    link.platform || link.label || link.iconKey || "Social";
                  const Icon = getIconForPlatform(platformName);
                  const colors = getColorForPlatform(platformName);

                  return (
                    <motion.a
                      key={index}
                      whileHover={{ y: -4, scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Connect on ${platformName}`}
                      className={`group relative w-14 h-14 rounded-xl bg-card border-2 border-border flex items-center justify-center text-muted-foreground transition-all shadow-md hover:shadow-xl ${colors.text} ${colors.bg} ${colors.border}`}
                    >
                      <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />

                      {/* Tooltip */}
                      <span className="absolute -bottom-10 left-1/2 -translate-x-1/2 px-3 py-1 rounded-lg bg-foreground text-background text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {platformName}
                      </span>
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}

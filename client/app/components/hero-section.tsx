"use client";

import Image from "next/image";
import { Profile } from "@/lib/types";

interface HeroSectionProps {
  profileData?: Profile;
}

export function HeroSection({ profileData }: HeroSectionProps) {
  // Suppress unused variable warning for now
  console.log("Profile data available:", !!profileData);

  return (
    <section id="home" className="relative border-b bg-background border-muted">
      <div className="container px-4 py-16 mx-auto sm:px-6 lg:px-8 lg:py-24">
        <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          {/* <!-- Text --> */}
          <div className="space-y-8 lg:col-span-7">
            <div className="space-y-4">
              <h1
                className="text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl text-slate-900"
                style={{ letterSpacing: "-0.04em" }}
              >
                {profileData?.tagline}
              </h1>
              <p className="max-w-xl text-sm sm:text-base text-slate-600">
                {profileData?.shortInfo}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-full bg-slate-900 px-5 py-2.5 text-xs sm:text-sm font-medium text-white shadow-sm hover:bg-slate-800 hover:shadow-md hover:-translate-y-0.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all"
              >
                View Projects
                <i
                  className="w-4 h-4 ml-2 lucide lucide-arrow-right"
                  style={{ strokeWidth: 1.5 }}
                ></i>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-900 hover:border-slate-900 hover:bg-slate-900 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-900 focus-visible:ring-offset-2 focus-visible:ring-offset-white transition-all"
              >
                Contact Me
              </a>
            </div>
          </div>

          {/* Portrait / Illustration */}
          <div className="lg:col-span-5">
            <div className="relative">
              {/* Subtle background card (parallax concept) */}
              <div className="absolute w-24 h-24 border border-dashed -top-6 -left-6 rounded-2xl border-slate-200 bg-slate-50/60"></div>
              <div className="absolute border -bottom-8 -right-4 h-28 w-28 rounded-2xl border-slate-200 bg-linear-to-tr from-slate-50 via-white to-indigo-50"></div>

              <div className="relative overflow-hidden bg-white border shadow-sm rounded-2xl border-slate-200">
                <div className="flex flex-col">
                  <div className="flex items-center justify-between px-4 pt-3 pb-2 border-b border-slate-100">
                    <div className="flex items-center space-x-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                      <span className="h-2.5 w-2.5 rounded-full bg-slate-300"></span>
                    </div>
                    <span className="text-[10px] font-medium text-slate-500">
                      portfolio.tsx
                    </span>
                  </div>
                  <div className="p-4 sm:p-5">
                    {/* Portrait */}
                    <div className="flex items-center space-x-4">
                      <div className="relative">
                        <Image
                          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80"
                          alt="Developer portrait"
                          width={64}
                          height={64}
                          className="object-cover w-16 h-16 border rounded-xl border-slate-200"
                        />
                        <span className="absolute -bottom-1 -right-1 inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-medium text-emerald-700 border border-emerald-100">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mr-1"></span>
                          Online
                        </span>
                      </div>
                      <div className="space-y-1">
                        <p className="text-sm font-medium text-slate-900">
                          John Doe
                        </p>
                        <p className="text-xs text-slate-500">
                          Crafting interfaces &amp; design systems for the web.
                        </p>
                      </div>
                    </div>

                    {/* <!-- Code-like info --> */}
                    <div className="px-3 py-3 mt-4 border rounded-lg bg-slate-50 border-slate-100">
                      <pre
                        className="text-[11px] leading-relaxed text-slate-700"
                        style={{
                          fontFamily:
                            "'SF Mono', ui-monospace, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
                        }}
                      >
                        <span className="text-slate-400">
                          {"// Current stack"}
                        </span>
                        {"\n"}
                        <span className="text-slate-500">{"const"}</span>
                        {" developer "}
                        <span className="text-slate-500">{"="}</span>
                        {" {\n"}
                        {"  role:        "}
                        <span className="text-emerald-600">
                          {"'Frontend Engineer'"}
                        </span>
                        {",\n"}
                        {"  location:    "}
                        <span className="text-indigo-600">
                          {"'Remote / EU'"}
                        </span>
                        {",\n"}
                        {"  focus:       "}
                        <span className="text-emerald-600">
                          {"'Interfaces & Design Systems'"}
                        </span>
                        {"\n"}
                        {"}"}
                      </pre>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Animation note (concept) */}
            <p className="mt-4 text-[11px] text-slate-400">
              Concept: card softly fades up with a slight parallax offset as it
              scrolls into view.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";

interface AboutSectionProps {
  profileData: any;
  featuredItemsCount: number;
}

export function AboutSection({
  profileData,
  featuredItemsCount,
}: AboutSectionProps) {
  const skills = [
    {
      category: "Frontend",
      items: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
    },
    {
      category: "Backend",
      items: ["Node.js", "Python", "PostgreSQL", "MongoDB"],
    },
    { category: "Tools", items: ["Docker", "AWS", "Git", "Figma"] },
  ];

  return (
    <section className="py-20 px-4 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="relative">
            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 h-24 w-24 rounded-2xl border border-dashed border-border bg-muted/60"></div>
            <div className="absolute -bottom-8 -right-4 h-28 w-28 rounded-2xl border border-border bg-gradient-to-tr from-muted via-background to-primary/10"></div>

            <div className="relative rounded-2xl border border-border bg-card shadow-sm overflow-hidden">
              <div className="flex flex-col">
                <div className="p-8 text-center border-b border-border">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary text-primary-foreground text-2xl font-bold mb-4 shadow-lg">
                    {profileData?.name?.charAt(0) || "D"}
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    {profileData?.name || "Developer"}
                  </h3>
                  <p className="text-muted-foreground">
                    {profileData?.title || "Full Stack Developer"}
                  </p>
                </div>

                <div className="p-8">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {skills.map((skillCategory, index) => (
                      <div key={index} className="text-center">
                        <div className="h-16 w-16 rounded-xl bg-primary flex items-center justify-center text-primary-foreground font-semibold text-lg border border-border mx-auto mb-3 shadow-md">
                          {skillCategory.category.charAt(0)}
                        </div>
                        <p className="text-xs font-medium text-foreground">
                          {skillCategory.category}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-center space-x-4">
                    {profileData?.socialLinks?.map(
                      (link: any, index: number) => (
                        <a
                          key={index}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-lg border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                        >
                          <span className="text-sm font-semibold">
                            {link.platform?.charAt(0).toUpperCase()}
                          </span>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-slate-900 mb-6">About Me</h2>
            <div className="space-y-4 mb-8">
              {profileData?.about ? (
                profileData.about.map((block: any, index: number) => {
                  if (block.type === "paragraph") {
                    return (
                      <p
                        key={index}
                        className="text-sm sm:text-base text-slate-700 leading-relaxed mb-4"
                      >
                        {block.children
                          ?.map((child: any) =>
                            child.type === "text" ? child.text : ""
                          )
                          .join("")}
                      </p>
                    );
                  }
                  return null;
                })
              ) : (
                <p className="text-lg text-slate-700 leading-relaxed">
                  Passionate about creating innovative web solutions that solve
                  real-world problems. I enjoy working with the latest
                  technologies and continuously learning new skills to deliver
                  exceptional user experiences.
                </p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-xl border border-blue-100">
                <h4 className="font-semibold text-slate-900 mb-2">
                  Experience
                </h4>
                <p className="text-2xl font-bold text-blue-600">3+ Years</p>
                <p className="text-sm text-slate-600 mt-1">
                  Full Stack Development
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-6 rounded-xl border border-purple-100">
                <h4 className="font-semibold text-slate-900 mb-2">Projects</h4>
                <p className="text-2xl font-bold text-purple-600">
                  {featuredItemsCount || 12}+
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Completed Projects
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

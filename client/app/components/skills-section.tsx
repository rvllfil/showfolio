"use client";

export function SkillsSection() {
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
    <section className="py-20 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Technical Skills
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Technologies and tools I use to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skillCategory, index) => (
            <div key={index} className="text-center">
              <div className="relative mb-6">
                <div className="h-20 w-20 rounded-2xl bg-primary flex items-center justify-center text-primary-foreground text-2xl font-bold mx-auto shadow-lg">
                  {skillCategory.category.charAt(0)}
                </div>
                <div className="absolute -top-2 -right-2 h-6 w-6 bg-green-400 rounded-full border-2 border-background"></div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-4">
                {skillCategory.category}
              </h3>

              <div className="space-y-2">
                {skillCategory.items.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="px-4 py-2 bg-muted border border-border rounded-lg text-foreground font-medium"
                  >
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import Image from "next/image";
import React from "react";

export default function Skills() {
  const codingSkills = [
    { name: "Nuxt", icon: "/skills/Nuxt.svg" },
    { name: "Next.js", icon: "/skills/NextJS.svg" },
    { name: "Tailwind", icon: "/skills/Tailwind.svg" },
    { name: "Three.js", icon: "/skills/ThreeJS.svg" },
    { name: "React", icon: "/skills/React.svg" },
    { name: "Vue", icon: "/skills/Vue.svg" },
    { name: "JavaScript", icon: "/skills/JavaScript.svg" },
    { name: "TypeScript", icon: "/skills/TypeScript.svg" },
    { name: "GSAP", icon: "/skills/GSAP.webp" },
  ];

  return (
    <div className="min-h-screen bg-neutral-900 text-white">
      <main className="max-w-7xl mx-auto px-8 py-16">
        <h1 className="text-7xl font-bold text-white mb-8">Skills</h1>

        <p className="text-2xl mb-10 max-w-4xl leading-relaxed">
          Thinking about working with me? Check out what I can do below and see
          how I can help bring your vision to life
        </p>

        {/* Coding Section */}
        <div className="mb-24">
          <h2 className="text-4xl font-mono mb-4 text-neutral-300">
            &lt;Coding /&gt;
          </h2>
          <p className="text-neutral-400 text-sm mb-8 max-w-md">
            These are all the frameworks and languages that I have experience
            with.
          </p>

          <div className="space-y-4">
            {codingSkills.map((skill, index) => (
              <div
                key={index}
                className="flex justify-between items-center py-4 border-b border-neutral-800 hover:border-neutral-700 transition"
              >
                <span className="text-lg">{skill.name}</span>
                <Image
                  src={skill.icon}
                  width={48}
                  height={48}
                  alt={skill.name}
                  className="w-8 h-8 "
                />
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

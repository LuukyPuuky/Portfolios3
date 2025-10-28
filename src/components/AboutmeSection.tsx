import { JSX } from "react";

interface Skill {
  name: string;
}

const SkillBadge = ({ name }: Skill) => (
  <span className="px-4 py-2 rounded-xl text-sm font-medium border-2  border-primary">
    {name}
  </span>
);

const Skills = () => {
  const skills: Skill[] = [
    { name: "Next.js" },
    { name: "Nuxt.js" },
    { name: "HTML" },
    { name: "JavaScript" },
    { name: "Tailwind" },
    { name: "GSAP" },
    { name: "Three.js" },
  ];

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-white mb-4">Skills</h2>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill) => (
          <SkillBadge key={skill.name} name={skill.name} />
        ))}
      </div>
    </div>
  );
};

export default function ProfileSection(): JSX.Element {
  return (
    <div className=" text-white bg-black h-screen">
      <div className=" mx-auto p-8 bg-black">
        <div className="space-y-2 text-gray-200 leading-relaxed">
          <p>
            I am a 22 year old IT Student from Hemond, Currently studying at
            Fontys Applied Sciences.
          </p>

          <p>
            I have a passion for Frontend Development and GSAP animations. I
            currently work at a gardencenter as a part-time job.
          </p>
          <p>
            Outside of IT, I enjoy Bouldering at Monk Eindhoven and I am
            currently in the 10th board of Salve Mundi.
          </p>
        </div>

        <Skills />
      </div>
    </div>
  );
}

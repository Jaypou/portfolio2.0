"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import SkillCard from "./SkillCard";

export default function SkillMain() {
  const dictionary = useDictionary();

  const skillsData = [
    {
      icon: "mingcute:code-fill",
      iconColor: "red-500",
      title: "Architecture des Solutions Numériques",
      skills: [
        "PHP, Python, JavaScript (ES6+)",
        "Laravel, NextJS, SpringBoot",
        "Applications d'Entreprise",
      ],
    },
    {
      icon: "mingcute:code-fill",
      iconColor: "blue-500",
      title: "Base de Données & Ingénierie des Données",
      skills: [
        "MySQL, SQL Server, PostgreSQL, Oracle",
        "MongoDB, Processus ETL",
        "Visualisation Power BI",
      ],
    },
    {
      icon: "mingcute:code-fill",
      iconColor: "orange-500",
      title: "Cloud & DevOps",
      skills: [
        "Microsoft Azure (IaaS/PaaS)",
        "Docker, Podman, Kubernetes",
        "CI/CD avec Jenkins, Git/SVN",
      ],
    },
    {
      icon: "mingcute:code-fill",
      iconColor: "yellow-500",
      title: "Ingénierie Systèmes",
      skills: [
        "Développement C/C++, Java",
        "Administration Linux",
        "Optimisation des Performances",
      ],
    },
    {
      icon: "mingcute:code-fill",
      iconColor: "green-500",
      title: "Inteligence Artificielle",
      skills: [
        "ChatGpt",
        "Github Copilot",
        "ClaudeAI",
        "Cline (VS Code Addon)",
      ],
    },
    {
      icon: "mingcute:code-fill",
      iconColor: "purple-500",
      title: "Compétences Professionnelles",
      skills: ["Stratégie & Innovation Technique"],
    },
  ];

  return (
    <div className="w-full py-20">
      <div className="container mx-auto flex flex-col items-center px-8 lg:max-w-7xl">
        <h1 className="mb-16 text-center text-5xl font-bold">
          Skills & Technologies
        </h1>
        <div className="flex w-full flex-col divide-y divide-gray-700/50 md:grid md:grid-cols-2 md:gap-6 md:divide-y-0 xl:grid-cols-3">
          {skillsData.map((skill, index) => (
            <div key={index} className="py-8 first:pt-0 last:pb-0 md:py-0">
              <SkillCard
                icon={skill.icon}
                iconColor={skill.iconColor}
                title={skill.title}
                skills={skill.skills}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

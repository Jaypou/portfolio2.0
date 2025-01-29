import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import { LandingFooter, ContactMain } from "@/components";
import ExperiencesMain from "@/components/experiences/ExperiencesMain";
import SkillMain from "@/components/skills/SkillMain";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="relative w-full">
      {/* Contact Section */}
      <section
        id="contact"
        className="flex min-h-screen w-full items-start justify-center bg-gradient-to-b from-black to-gray-600 md:pl-24 xl:pl-32"
      >
        <ContactMain />
      </section>

      {/* About Section */}
      <section
        id="about"
        className="flex min-h-screen w-full items-start justify-center bg-gray-400 md:pl-24 xl:pl-32"
      >
        <h2 className="text-5xl font-bold text-black">About Me</h2>
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="flex min-h-screen w-full items-start justify-center bg-gray-400 md:pl-24 xl:pl-32"
      >
        <SkillMain />
      </section>

      {/* Projects Section */}
      <section
        id="experiences"
        className="flex min-h-screen w-full items-start justify-center bg-gray-400 md:pl-24 xl:pl-32"
      >
        <ExperiencesMain />
      </section>

      <div className="absolute bottom-0 right-0 z-[2] h-fit w-full">
        <LandingFooter />
      </div>
    </div>
  );
}

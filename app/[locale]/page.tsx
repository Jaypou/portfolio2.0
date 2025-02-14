import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import {
  LandingFooter,
  ContactMain,
  AboutMain,
  ExperienceMain,
} from "@/components";
// import ExperiencesMain from "@/components/about/ExperiencesMain";
import SkillMain from "@/components/skills/SkillMain";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="relative w-full">
      {/* Contact Section */}
      <section
        id="contact"
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
      >
        <ContactMain />
      </section>

      {/* Skills Section */}
      <section
        id="skills"
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
      >
        <SkillMain />
      </section>

      {/* Projects Section */}
      <section
        id="experiences"
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
      >
        <ExperienceMain />
      </section>
      {/* About Section */}
      <section
        id="about"
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
      >
        <AboutMain />
      </section>

      <div className="absolute bottom-0 right-0 z-[2] h-fit w-full">
        <LandingFooter />
      </div>
    </div>
  );
}

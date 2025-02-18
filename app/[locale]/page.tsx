import {
  AboutMain,
  ContactMain,
  ExperienceMain,
  LandingFooter,
  SkillMain,
} from "@/components";

export default function Page() {
  return (
    <div className="relative w-full">
      {/* Contact Section */}
      <section
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
        id="contact"
      >
        <ContactMain />
      </section>

      {/* Skills Section */}
      <section
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
        id="skills"
      >
        <SkillMain />
      </section>

      {/* Projects Section */}
      <section
        className="flex min-h-screen w-full items-start justify-center md:pl-24 xl:pl-32"
        id="experiences"
      >
        <ExperienceMain />
      </section>

      {/* About Section */}
      <section
        className="flex min-h-screen w-full items-center justify-center md:pl-24 xl:pl-32"
        id="about"
      >
        <AboutMain />
      </section>

      <LandingFooter />
    </div>
  );
}

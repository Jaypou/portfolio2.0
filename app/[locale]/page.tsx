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
        className="flex min-h-screen w-full items-start justify-center md:pl-16 lg:pl-20"
        id="contact"
      >
        <ContactMain />
      </section>

      {/* Skills Section */}
      <section
        className="flex min-h-screen w-full items-start justify-center md:pl-16 lg:pl-20"
        id="skills"
      >
        <SkillMain />
      </section>

      {/* Projects Section */}
      <section
        className="flex min-h-screen w-full items-start justify-center md:pl-16 lg:pl-20"
        id="experiences"
      >
        <ExperienceMain />
      </section>

      {/* About Section */}
      <section
        className="items-centet flex min-h-screen w-full justify-center md:pl-16 lg:pl-20"
        id="about"
      >
        <AboutMain />
      </section>

      <LandingFooter />
    </div>
  );
}

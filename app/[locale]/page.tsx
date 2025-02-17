import {
  LandingFooter,
  ContactMain,
  AboutMain,
  ExperienceMain,
  SkillMain,
} from "@/components";
import { LoadingScreen } from "@/components/shared/LoadingScreen";

export default function Page({ params }: { params: { locale: string } }) {
  return (
    <LoadingScreen>
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
          className="flex min-h-screen w-full items-center justify-center md:pl-24 xl:pl-32"
        >
          <AboutMain />
        </section>

        <LandingFooter />
      </div>
    </LoadingScreen>
  );
}

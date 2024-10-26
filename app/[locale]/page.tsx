import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import {
  Presentation,
  VideoBackground,
  VideoHero,
  LandingFooter,
} from "@/components";
import { GetNavItems } from "@/constants/GetNavbarConst";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  const presentationData = {
    fullName: "Jérémie Pouliot",
    title: "Developpeur    web   junior",
    experience: "5 years in web development",
    location: "Montreal, Canada",
    languages: ["English", "French"],
    age: "30 years old",
    imageUrl:
      "https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  };

  const navItems = await GetNavItems(locale);

  return (
    <div className="relative flex h-screen min-h-screen w-full flex-col gap-y-16">
      {/* <div className="h-full w-full">
        <VideoHero
          HeroTitle={dictionary.Landing.Hello}
          HeroSubtitle={dictionary.Landing.CreatingExperiences}
          videoSource="/assets/videos/code_background_loop.mov"
          fadeOutDuration={1}
          easeOptions="power3.inOut"
        />
      </div> */}

      <div className="h-[90vh] w-full overflow-visible">
        <Presentation navItems={navItems} {...presentationData} />
      </div>

      <div className="absolute bottom-0 right-0 z-[2] h-fit w-full">
        <LandingFooter />
      </div>
    </div>
  );
}

import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import {
  Presentation,
  VideoBackground,
  VideoHero,
  LandingFooter,
} from "@/components";
import PerspectiveCanvas from "@/components/landing/PerspectiveCanvas";
import { GetNavItems } from "@/constants/GetNavbarConst";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  const navItems = await GetNavItems(locale);

  return (
    <div className="relative flex h-full min-h-screen w-full flex-col gap-y-16">
      {/* <div className="h-full w-full">
        <VideoHero
          HeroTitle={dictionary.Landing.Hello}
          HeroSubtitle={dictionary.Landing.CreatingExperiences}
          videoSource="/assets/videos/code_background_loop.mov"
          fadeOutDuration={1}
          easeOptions="power3.inOut"
        />
      </div> */}

      <div className="absolute inset-0">
        <VideoBackground
          videoSource="/assets/videos/code_background_loop.mov"
          videoClassnames="opacity-20"
          fadeOutDuration={1.5}
          easeOptions="power1.inOut"
        />
      </div>

      {/* Corriger le focal point de la perspective */}

      <div className="h-full w-full overflow-visible">
        {/* <Presentation navItems={navItems} /> */}
        <PerspectiveCanvas navItems={navItems} />
      </div>

      <div className="absolute bottom-0 right-0 z-[2] h-fit w-full">
        <LandingFooter />
      </div>
    </div>
  );
}

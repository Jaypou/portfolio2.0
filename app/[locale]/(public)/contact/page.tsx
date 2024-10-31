import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import { VideoHero } from "@/components";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex min-h-screen flex-col">
      <div className="h-full w-full">
        <VideoHero
          HeroTitle={dictionary.Landing.Hello}
          HeroSubtitle={dictionary.Landing.CreatingExperiences}
          videoSource="/assets/videos/coffee_loop.mov"
          fadeOutDuration={1}
          easeOptions="power3.inOut"
        />
      </div>
    </div>
  );
}

import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import { Presentation, VideoHero } from "@/components";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  const presentationData = {
    fullName: "Jérémie Pouliot",
    experience: "5 years in web development",
    location: "Montreal, Canada",
    languages: ["English", "French"],
    age: "30 years old",
    imageUrl: "/placeholder-image.jpg",
  };

  return (
    <div className="flex min-h-screen w-full flex-col">
      <div className="h-full w-full">
        <VideoHero
          HeroTitle={dictionary.Landing.Hello}
          HeroSubtitle={dictionary.Landing.JuniorWebDev}
          videoSource="/assets/videos/code_background_loop.mov"
          fadeOutDuration={1}
          easeOptions="power3.inOut"
        />
      </div>

      <div className="flex-center flex-col">
        <div className="h-[600px] w-full">
          <Presentation {...presentationData} />
        </div>
        <div className="h-[600px]">Studies</div>
        <div className="h-[600px]">CTA to project</div>
      </div>
    </div>
  );
}

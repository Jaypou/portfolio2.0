import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import { VideoHero } from "@/components";
import ContactCard from "@/components/contact/ContactCard";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  const ContactData = {
    ContactName: dictionary.Contact.ContactName,
    ContactPosition: dictionary.Contact.ContactPosition,
    FindMe: dictionary.Contact.FindMe,
    ContactMe: dictionary.Contact.ContactMe,
    SocialLinks: [
      "https://github.com/jaypou",
      "https://linkedin.com/in/jeremie-pouliot",
      "https://twitter.com/jeremie_pouliot",
    ],
  };

  return (
    <div className="">
      {/* <div className="h-full w-full">
        <VideoHero
          HeroTitle={dictionary.Landing.Hello}
          HeroSubtitle={dictionary.Landing.CreatingExperiences}
          videoSource="/assets/videos/coffee_loop.mov"
          fadeOutDuration={1}
          easeOptions="power3.inOut"
        />
      </div> */}

      <div className="h-screen">
        <div className="h-full w-full bg-black">
          <ContactCard ContactData={ContactData} />
        </div>
      </div>
    </div>
  );
}

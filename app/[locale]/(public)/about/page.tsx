import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import PerspectiveCanvas from "@/components/landing/PerspectiveCanvas";
import {
  AboutFlex,
  AboutInterest,
  HeroCard,
  VideoBackground,
} from "@/components";
import AboutTimeline from "@/components/about/AboutTimeline";
import React from "react";
import AboutMe from "@/components/about/AboutMe";
import AboutSkill from "@/components/about/AboutSkill";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  const Title = [{ name: "About me", href: "/about" }];

  const items = [
    {
      title: "À propos de moi",
      content: (
        <div className="p h-full w-full">
          <AboutMe />
        </div>
      ),
      image: "/assets/images/spring.jpg",
    },
    {
      title: dictionary.About.MyInterests.Title,
      content: (
        <div className="h-full w-full">
          <AboutInterest />
        </div>
      ),
      image: "/assets/images/winter.jpg",
    },
    {
      title: "Timeline",
      content: (
        <div className="h-fit w-full">
          <AboutTimeline />
        </div>
      ),
      image: "/assets/images/summer.jpg",
    },
    {
      title: "Skill Badges",
      content: (
        <div className="flex h-full w-full items-center justify-center">
          <AboutSkill />
        </div>
      ),
      image: "/assets/images/autumn.jpg",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      {/* <div className="relative h-full w-full">
        <div className="absolute inset-0 h-[60vh] w-full">
          <VideoBackground
            videoSource="/assets/videos/coffee_loop.mov"
            fadeOutDuration={1}
            easeOptions="power3.inOut"
          />
        </div>

        <div className="h-full w-full overflow-visible">
          <PerspectiveCanvas navItems={Title} />
        </div>
      </div> */}

      <div className="h-full w-full py-20 lg:px-10">
        <AboutFlex items={items} />
      </div>
    </div>
  );
}

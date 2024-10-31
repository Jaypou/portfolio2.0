import React from "react";
import { HeroCard } from "../shared";

import IronMan1 from "@/public/assets/images/IronMan1.png";
import IronMan3 from "@/public/assets/images/IronMan3.png";
import IronManLogo from "@/public/assets/images/IronManLogo.png";

export default function AboutInterest() {
  return (
    <div className="h-full w-full px-6">
      <div className="flex h-full w-full items-center justify-around rounded-lg bg-black/10 text-white shadow-2xl shadow-black backdrop-blur-sm">
        <div className="flex w-[50%] flex-col gap-y-8 py-6 md:py-10 lg:py-12 xl:py-20">
          <p>
            I'm someone who thrives on challenge and self-improvement. I love
            taking on new adventures, whether it's exploring new places, hitting
            the gym, or testing my limits outdoors.
          </p>
          <p>
            I'm also passionate about motorcycles and a big fan of epic worlds
            like The Lord of the Rings and the Marvel Universe—let's be honest,
            DC doesn't quite measure up! In my downtime, I enjoy video games,
            strong coffee, and trips to the cinema.
          </p>
          <p>
            For me, every day is an opportunity to push myself a little further
            and be better than I was yesterday.
          </p>
        </div>
        <div className="z-10 flex h-full w-[30%] justify-end xl:h-[60%]">
          <HeroCard
            coverImage={IronMan1}
            titleImage={IronManLogo}
            characterImage={IronMan3}
          />
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { HeroCard } from "../shared";
import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";

import IronMan1 from "@/public/assets/images/IronMan1.png";
import IronMan3 from "@/public/assets/images/IronMan3.png";
import IronManLogo from "@/public/assets/images/IronManLogo.png";

export default function AboutInterest() {
  const dictionary = useDictionary();
  return (
    <div className="h-full w-full px-6">
      <div className="flex h-full w-full flex-col items-center text-white md:flex-row md:justify-around">
        <div className="flex w-full flex-col gap-y-8 py-6 md:w-[50%] md:py-10 lg:py-12 xl:py-20">
          <p>{dictionary.About.MyInterests.Content.P1}</p>
          <p>{dictionary.About.MyInterests.Content.P2}</p>
          <p>{dictionary.About.MyInterests.Content.P3}</p>
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

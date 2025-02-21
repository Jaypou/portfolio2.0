"use client";

import { useDictionary } from "@/app/[locale]/dictionary-provider";

export default function LandingFooter() {
  const dictionary = useDictionary();

  return (
    <div className="absolute bottom-3 right-6">
      <div className="w-full text-sm italic text-white opacity-40">
        © {new Date().getFullYear()} Jérémie Pouliot {dictionary.Copyrights}
      </div>
    </div>
  );
}

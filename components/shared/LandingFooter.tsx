"use client";
import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
export default function LandingFooter() {
  const dictionary = useDictionary();

  return (
    <div className="fixed bottom-0 right-0 -z-10 rounded-lg p-4">
      <div className="text-sm italic text-white opacity-40">
        © {new Date().getFullYear()} Jérémie Pouliot {dictionary.Copyrights}
      </div>
    </div>
  );
}

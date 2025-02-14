import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";

export function GetProgressNavItems() {
  const dictionary = useDictionary();
  return [
    {
      icon: "mdi:account",
      href: "#contact",
      label: dictionary.ProgressNav.Contact,
    },

    {
      icon: "mdi:lightbulb",
      href: "#skills",
      label: dictionary.ProgressNav.Skills,
    },
    {
      icon: "mdi:briefcase",
      href: "#experiences",
      label: dictionary.ProgressNav.Experiences,
    },
    {
      icon: "mdi:rocket-launch",
      href: "#about",
      label: dictionary.ProgressNav.About,
    },
  ];
}

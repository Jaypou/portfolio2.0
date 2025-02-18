import { getDictionary } from "@/app/[locale]/public-dictionaries";

export async function GetProgressNavItems(locale: string) {
  const dictionary = await getDictionary(locale); // Get the dictionary for the given locale

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

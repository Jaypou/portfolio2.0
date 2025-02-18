import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import { Navbar } from "@nextui-org/react";

export async function GetNavItems(locale: string) {
  const dictionary = await getDictionary(locale); // Get the dictionary for the given locale

  return [
    {
      name: dictionary.Navbar.Home || "Home",
      href: `/${locale}/`,
    },
    {
      name: dictionary.Navbar.About || "About",
      href: `/${locale}/about`,
    },
    {
      name: dictionary.Navbar.Contact || "Contact",
      href: `/${locale}/contact/`,
    },
    // {
    //   name: dictionary.Navbar.Homepage || "Homepage",
    //   href: `/${locale}/homepage/`,
    // },
    {
      name: dictionary.Navbar.Projects || "Projects",
      href: `/${locale}/projects/`,
    },
    {
      name: dictionary.Navbar.Skills || "Skills",
      href: `/${locale}/skills`,
    },
  ];
}

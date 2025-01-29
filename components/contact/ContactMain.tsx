"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { ContactCard2 } from "@/components";

export default function ContactMain() {
  const dictionary = useDictionary();

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
    PhoneNumber: "819-342-3376",
    Email: "jeremie.pouliot3376@hotmail.com",
  };

  return (
    <div className="h-full w-full ">
      <ContactCard2 ContactData={ContactData} />
    </div>
  );
}

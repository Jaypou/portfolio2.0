"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import { ContactCard2 } from "@/components";

export default function ContactMain() {
  const dictionary = useDictionary();

  const ContactData = {
    ContactName: dictionary.Contact.ContactName,
    ContactPosition: dictionary.Contact.ContactPosition,
    SocialLinks: [
      "https://facebook.com/jeremie_pouliot",
      "https://linkedin.com/jeremie-pouliot",
      "https://github.com/jaypou",
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

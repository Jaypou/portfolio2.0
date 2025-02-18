"use client";

import { useDictionary } from "@/app/[locale]/dictionary-provider";
import { ContactCard2 } from "@/components";

export default function ContactMain() {
  const dictionary = useDictionary();

  const ContactData = {
    ContactName: dictionary.Contact.ContactName,
    ContactPosition: dictionary.Contact.ContactPosition,
    SocialLinks: [
      "https://www.facebook.com/jeremie.pouliot.96/",
      "https://ca.linkedin.com/in/j%C3%A9r%C3%A9mie-pouliot-51430a242/",
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

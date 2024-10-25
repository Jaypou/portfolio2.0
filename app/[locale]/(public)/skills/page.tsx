import Image from "next/image";
import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex-center flex min-h-screen flex-col">
      <div>Hero</div>
      <div>Theme and OS switcher</div>
      <div>Experience with mac and windows</div>
      <div>IconCloud</div>
      <div>CTA to project</div>
    </div>
  );
}

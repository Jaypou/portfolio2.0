import Image from "next/image";
import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex-center flex min-h-screen flex-col">
      <div>Hero</div>

      <div className="perspective-400">
        Composant flex-grow comme sur messenger avec toutes les options
        suivantes
      </div>

      <div>More about me</div>
      <div>Timeline</div>
      <div>Short tech stack</div>
      <div>CTA to project</div>
    </div>
  );
}

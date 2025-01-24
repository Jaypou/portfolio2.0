import Image from "next/image";
import { getDictionary } from "@/app/[locale]/(public)/public-dictionaries";
import ProgressNav from "@/components/navigation/ProgressNav";

export default async function Page({ params }: { params: { locale: string } }) {
  const locale: string = params.locale;
  const dictionary = await getDictionary(locale);

  return (
    <div className="flex-center flex min-h-screen flex-col">
      {/* <div>Hero</div>
      <div>Grid or parallax of projects</div> */}
      <ProgressNav />
    </div>
  );
}

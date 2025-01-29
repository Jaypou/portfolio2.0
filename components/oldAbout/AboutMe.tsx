"use client";
import React from "react";
import Image from "next/image";
import Jeremie from "@/public/assets/images/jeremie.jpg";
import Jeremie_noBg from "@/public/assets/images/jeremie-no-bg.png";
import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";

export default function CardComponent() {
  const dictionary = useDictionary();
  return (
    <div className="container mx-auto px-4 py-8 md:px-6 lg:px-8">
      <div className="flex flex-col gap-6 rounded-xl p-6 md:p-8">
        {/* Header Section */}
        <div className="flex flex-col gap-4">
          <h2 className="text-2xl font-light italic text-white md:text-3xl">
            Jeremie Pouliot
          </h2>
          <p className="text-base text-white/90 md:text-lg">
            {dictionary.About.AboutMe.Content}
          </p>
        </div>

        {/* Footer Section */}
        <div className="mt-4 flex flex-col items-center gap-6 md:flex-row md:justify-between">
          <h3 className="text-lg text-white/90">Au plaisir !</h3>
          <div className="w-full max-w-[300px] md:w-auto">
            <div className="overflow-hidden rounded-lg">
              <Image
                src={Jeremie_noBg}
                alt="Profile picture"
                width={300}
                height={300}
                className="w-full transform object-cover transition-transform duration-300 hover:scale-110"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// export default function CardComponent() {
//   const dictionary = useDictionary();
//   return (
//     <div className="h-full w-full px-10">
//       <div className="flex flex-col items-center justify-center gap-x-6 md:flex-row">
//         <div className="inline-block h-full overflow-hidden rounded-lg md:w-[40%]">
//           <Image
//             // src="https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg"
//             src={Jeremie_noBg}
//             alt="Al pacino"
//             width={350}
//             height={350}
//             className="rounded-md object-cover transition-transform duration-500 hover:scale-150"
//           />
//         </div>

//         <div className="flex h-full w-full flex-col text-white">
//           <h2>Jeremie Pouliot</h2>
//           <p>{dictionary.About.AboutMe.Content}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

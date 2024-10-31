import React from "react";
import Image from "next/image";
import Jeremie from "@/public/assets/images/jeremie.jpg";

export default function CardComponent() {
  return (
    <div className="h-full w-full px-10">
      <div className="flex items-center justify-center gap-x-6">
        <div className="flex flex-col text-white">
          <h2>Jeremie Pouliot</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
            quis est non urna efficitur sodales. Vivamus aliquet mattis arcu a
            efficitur. Sed sed congue odio. Aliquam erat volutpat. Aenean ornare
            sagittis libero, a euismod urna molestie et. Vestibulum pretium diam
            neque, vel feugiat orci dictum in. Integer quis lacus lorem. Donec
            vitae sagittis augue, sit amet bibendum turpis.
          </p>
        </div>

        <div className="inline-block h-full w-full overflow-hidden rounded-lg">
          <Image
            // src="https://i.pinimg.com/736x/8f/a0/51/8fa051251f5ac2d0b756027089fbffde--terry-o-neill-al-pacino.jpg"
            src={Jeremie}
            alt="Al pacino"
            width={350}
            height={350}
            className="rounded-md object-none transition-transform duration-500 hover:scale-150"
          />
        </div>
      </div>
    </div>
  );
}

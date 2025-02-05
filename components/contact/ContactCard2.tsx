"use client";
import React from "react";
import Image from "next/image";
import { HyperText, IconComp } from "@/components";

export default function ContactCard({ ContactData }: any) {
  return (
    <div className="flex min-h-[100vh] flex-col items-center justify-center space-y-6">
      {/* Profile Image */}
      <div className="relative h-60 w-60">
        <div className="absolute h-full w-full rounded-full border-4 border-white/80 [box-shadow:0_0_20px_10px_rgba(255,255,255,0.5)]">
          <Image
            src="/assets/images/jeremie-no-bg.png"
            alt="Profile"
            fill
            className="rounded-full object-cover"
          />
        </div>
      </div>

      {/* Name and Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
          {ContactData.ContactName}
        </h1>
        <div className="mt-3 flex items-center justify-center text-xl text-white/80 sm:text-2xl md:text-3xl">
          {/* {ContactData.ContactPosition} */}
          <HyperText text={ContactData.ContactPosition} duration={1000} />
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex flex-col items-center justify-center gap-4 text-sm md:flex-row md:gap-10 md:text-base">
        <a
          href={`tel:+${ContactData.PhoneNumber}`}
          className="flex items-center justify-center gap-2 text-white/70 transition-colors hover:text-blue-500"
        >
          <IconComp icon="line-md:phone" className="h-6 w-6" />
          {ContactData.PhoneNumber}
        </a>
        <a
          href={`mailto:${ContactData.Email}`}
          className="flex items-center justify-center gap-2 text-white/70 transition-colors hover:text-blue-500"
        >
          <IconComp icon="line-md:email" className="h-6 w-6" />
          {ContactData.Email}
        </a>
      </div>
    </div>
  );
}

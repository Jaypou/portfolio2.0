"use client";
import React from "react";
import Image from "next/image";
import { HyperText } from "../shared";

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
        <h1 className="text-4xl font-bold text-white md:text-6xl">
          {ContactData.ContactName}
        </h1>
        <div className="mt-3 flex items-center justify-center text-xl text-white/80 md:text-2xl">
          {/* {ContactData.ContactPosition} */}
          <HyperText text={ContactData.ContactPosition} duration={1000} />
        </div>
      </div>

      {/* Contact Information */}
      <div className="flex items-center justify-center gap-10">
        <a
          href={`tel:+${ContactData.PhoneNumber}`}
          className="text-white/70 transition-colors hover:text-blue-500"
        >
          {ContactData.PhoneNumber}
        </a>
        <a
          href={`mailto:${ContactData.Email}`}
          className="text-sm text-white/70 transition-colors hover:text-blue-500"
        >
          {ContactData.Email}
        </a>
      </div>
    </div>
  );
}

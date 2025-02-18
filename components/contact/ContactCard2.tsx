"use client";

import React, { useEffect, useRef } from "react";

import Image from "next/image";

import { HyperText, IconComp, Social } from "@/components";
import gsap from "gsap";

// import { Skeleton } from "@nextui-org/react";

export default function ContactCard({ ContactData }: any) {
  const phoneRef = useRef(null);
  const emailRef = useRef(null);
  const socialsRef = useRef(null);

  useEffect(() => {
    if (
      !ContactData ||
      !phoneRef.current ||
      !emailRef.current ||
      !socialsRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set([phoneRef.current, emailRef.current, socialsRef.current], {
        opacity: 0,
        y: 10,
      });

      gsap.to([phoneRef.current, emailRef.current, socialsRef.current], {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.4,
        ease: "power2.out",
        delay: 0.3,
      });
    });

    return () => ctx.revert();
  }, [ContactData]);

  return (
    // <Skeleton className="h-full w-full rounded-lg" isLoaded={ContactData}>
    <div className="flex min-h-[100vh] flex-col items-center justify-center space-y-6">
      {/* Profile Image */}
      <div className="relative h-60 w-60">
        <div className="absolute h-full w-full rounded-full border-4 border-white/20 [box-shadow:0_0_20px_20px_rgba(0,165,255,0.5)]">
          <Image
            fill
            alt="Profile"
            className="rounded-full bg-black object-cover"
            src="/assets/images/jeremie-no-bg.png"
          />
        </div>
      </div>
      {/* Name and Title */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white [text-shadow:_0_4px_8px_rgb(255_255_255_/_30%)] sm:text-5xl md:text-6xl">
          {ContactData.ContactName}
        </h1>
        <div className="mt-3 flex items-center justify-center text-xl text-white/80 sm:text-2xl md:text-3xl">
          {/* {ContactData.ContactPosition} */}
          <HyperText duration={1800} text={ContactData.ContactPosition} />
        </div>
      </div>
      {/* Contact Information */}
      <div className="flex flex-col items-center justify-center gap-4 text-sm [text-shadow:_0_2px_4px_rgb(255_255_255_/_30%)] md:flex-row md:gap-10 md:text-base">
        <a
          ref={phoneRef}
          className="flex items-center justify-center gap-2 text-white/70 transition-colors hover:text-blue-500"
          href={`tel:+${ContactData.PhoneNumber}`}
        >
          <IconComp className="h-6 w-6" icon="line-md:phone" />
          {ContactData.PhoneNumber}
        </a>
        <a
          ref={emailRef}
          className="flex items-center justify-center gap-2 text-white/70 transition-colors hover:text-blue-500"
          href={`mailto:${ContactData.Email}`}
        >
          <IconComp className="h-6 w-6" icon="line-md:email" />
          {ContactData.Email}
        </a>
      </div>
      <div ref={socialsRef} className="flex items-center space-x-4">
        <Social rotate className="h-12 w-12" hrefs={ContactData.SocialLinks} />
      </div>
    </div>
    // </Skeleton>
  );
}

"use client";
import React, { useState } from "react";
import Image from "next/image";
import Social from "../shared/Social";
import EmailForm from "./EmailForm";

export default function ContactCard({ ContactData }: any) {
  const [showEmailForm, setShowEmailForm] = useState(false);
  return (
    <div className="relative mx-auto max-w-4xl pt-[5%]">
      {/* Main card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-purple-900/90 to-pink-900/90 p-8 shadow-2xl backdrop-blur-sm">
        <div className="flex flex-col gap-8 md:flex-row">
          {/* Profile Image */}
          <div className="flex-shrink-0">
            <div className="relative h-48 w-48 overflow-hidden rounded-2xl">
              <Image
                src="/assets/images/jeremie-no-bg.png"
                alt="Profile"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Content */}
          <div className="flex flex-1 flex-col justify-between">
            {/* Header */}
            <div>
              <h1 className="text-4xl font-bold text-white">
                {ContactData.ContactName}
              </h1>
              <p className="mt-2 text-xl text-pink-500">
                {ContactData.ContactPosition}
              </p>
            </div>

            {/* Social Links */}
            <div className="mt-6">
              <p className="mb-4 text-gray-400">{ContactData.FindMe}</p>
              <div className="flex flex-col gap-3">
                <Social
                  hrefs={ContactData.SocialLinks}
                  layout="row"
                  showUsername
                  className="h-8 w-8"
                />
              </div>
            </div>

            {/* Chat Button */}
            <button
              onClick={() => setShowEmailForm(true)}
              className="mt-8 w-full rounded-lg bg-pink-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-pink-700 md:w-auto"
            >
              {ContactData.ContactMe}
            </button>
          </div>
        </div>
      </div>

      {/* Email Form */}
      {showEmailForm && <EmailForm onClose={() => setShowEmailForm(false)} />}
    </div>
  );
}

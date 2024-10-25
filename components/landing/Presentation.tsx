"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import HyperText from "../shared/hyper-text";

export interface PresentationProps {
  fullName: string;
  experience: string;
  location: string;
  languages: string[];
  age: string;
  imageUrl: string;
}

export default function Presentation({
  fullName,
  experience,
  location,
  languages,
  age,
  imageUrl,
}: PresentationProps) {
  const [fileNumber, setFileNumber] = useState("000000");

  useEffect(() => {
    setFileNumber(
      Math.floor(Math.random() * 1000000)
        .toString()
        .padStart(6, "0")
    );
  }, []);

  return (
    <div className="bg-black p-8 font-mono text-green-500">
      <div className="relative border-2 border-green-500 p-6">
        <h1 className="mb-4 text-2xl">TOP SECRET</h1>
        <div className="flex">
          <div className="mr-4 w-1/3">
            <Image
              src={imageUrl || "/placeholder-image.jpg"}
              alt="Agent"
              width={200}
              height={200}
              className="border-2 border-green-500"
            />
          </div>
          <div className="w-2/3 space-y-2">
            <div className="flex items-center">
              <span className="mr-2 font-bold">Name: </span>
              <HyperText
                text={fullName || "fullName"}
                className="text-green-500"
                // duration={10000}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">Experience: </span>
              <HyperText
                text={experience || "experience"}
                className="text-green-500"
                duration={5}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">Location: </span>
              <HyperText
                text={location || "location"}
                className="text-green-500"
                duration={5}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">Languages: </span>
              <HyperText
                text={languages ? languages.join(", ") : ""}
                className="text-green-500"
                duration={5}
              />
            </div>
            <div className="flex items-center">
              <span className="mr-2 font-bold">Age: </span>
              <HyperText
                text={age ? age.toString() : ""}
                className="text-green-500"
                duration={5}
              />
            </div>
          </div>
        </div>
        <div className="absolute right-2 top-2 flex items-center justify-center gap-x-2 text-xs">
          <p>Filenumber :</p>
          <HyperText
            text={"POUJ-2024"}
            className="text-green-500"
            duration={10}
          />
        </div>
      </div>
    </div>
  );
}

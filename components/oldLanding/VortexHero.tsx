"use client";
import React from "react";
import { Vortex } from "@/components";

interface VortexDemoProps {
  data?: {
    title?: string;
    subtitle?: string;
  };
}

export default function VortexDemo({ data = {} }: VortexDemoProps) {
  const { title, subtitle } = data;
  return (
    <div className="mx-auto h-[30rem] w-full  overflow-hidden rounded-md">
      <Vortex
        backgroundColor="black"
        className="flex h-full w-full flex-col items-center justify-center px-2 py-4 md:px-10"
      >
        {data && (
          <>
            {title && (
              <h2 className="text-center text-2xl font-bold text-white md:text-6xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-6 max-w-xl text-center text-sm text-white md:text-2xl">
                {subtitle}
              </p>
            )}
          </>
        )}

        {/* <div className="mt-6 flex flex-col items-center gap-4 sm:flex-row">
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white shadow-[0px_2px_0px_0px_#FFFFFF40_inset] transition duration-200 hover:bg-blue-700">
            Order now
          </button>
          <button className="px-4 py-2  text-white ">Watch trailer</button>
        </div> */}
      </Vortex>
    </div>
  );
}

"use client";
import { FloatingDockDemo } from "@/components/FloatingDockDemo";
import WindowsTaskBar from "@/components/WindowsTaskBar";
import React from "react";

export default function Page() {
  return (
    <div className="relative h-screen w-full">
      {/* <FloatingDockDemo /> */}

      <div className="absolute bottom-0 z-[0] w-full">
        <WindowsTaskBar />
      </div>
    </div>
  );
}

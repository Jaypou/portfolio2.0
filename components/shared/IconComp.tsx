"use client";
import React from "react";
import { Icon } from "@iconify/react/dist/iconify.js";

export default function IconComp({
  icon,
  className,
  alt,
}: {
  icon: string;
  className: string;
  alt?: string;
}) {
  return <Icon icon={icon} className={className} />;
}

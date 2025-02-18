"use client";

import React from "react";

import { Icon } from "@iconify/react/dist/iconify.js";

export default function IconComp({
  icon,
  className,
}: {
  icon: string;
  className: string;
}) {
  return <Icon className={className} icon={icon} />;
}

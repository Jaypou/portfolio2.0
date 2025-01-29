import React from "react";
import { FloatingDock } from "@/components";
// import {
//   IconBrandGithub,
//   IconBrandX,
//   IconExchange,
//   IconHome,
//   IconNewSection,
//   IconTerminal2,
// } from "@tabler/icons-react";
import IconComp from "@components/shared/IconComp";
import Image from "next/image";

export default function FloatingDockDemo() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconComp
          icon={"tabler:home"}
          className={"h-full w-full text-neutral-500 dark:text-neutral-300"}
        />
        // <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Products",
      icon: (
        <IconComp
          icon={"tabler:terminal-2"}
          className={"h-full w-full text-neutral-500 dark:text-neutral-300"}
        />
        // <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Components",
      icon: (
        <IconComp
          icon={"tabler:new-section"}
          className={"h-full w-full text-neutral-500 dark:text-neutral-300"}
        />
        // <IconNewSection className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Aceternity UI",
      icon: (
        <Image
          src="https://assets.aceternity.com/logo-dark.png"
          width={32}
          height={32}
          alt="Aceternity Logo"
        />
      ),
      href: "#",
    },
    {
      title: "Changelog",
      icon: (
        <IconComp
          icon={"tabler:exchange"}
          className={"h-full w-full text-neutral-500 dark:text-neutral-300"}
        />
        // <IconExchange className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },

    {
      title: "Twitter",
      icon: (
        <IconComp
          icon={"tabler:brand-x"}
          className={"h-full w-full text-neutral-500 dark:text-neutral-300"}
        />
        // <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconComp
          icon={"mdi:github"}
          className={"h-full w-full text-neutral-500 dark:text-neutral-300"}
        />
        // <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
  ];
  return (
    <div className="flex h-fit w-full flex-col items-center justify-center">
      <FloatingDock
        mobileClassName="" // only for demo, remove for production
        items={links}
      />
    </div>
  );
}

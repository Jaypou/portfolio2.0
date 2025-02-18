"use client";

import React, { useEffect, useState } from "react";

import { usePathname, useRouter } from "next/navigation";

import { useScrollVisibility } from "@/hooks/useScrollVisibility";
import clsx from "clsx";

import { cn } from "@/lib/cn";

const locales = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const { isVisible, isLoading } = useScrollVisibility();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);

    router.push(newPath);
  };

  return (
    <div
      className={clsx(
        "fixed right-8 top-8 z-50 flex items-center gap-1 transition-all duration-300",
        !isLoading && "opacity-100",
        isClient && !isVisible && "-translate-y-20 opacity-0",
        isClient && isVisible && "translate-y-0 opacity-100"
      )}
    >
      {locales.map((locale, index) => (
        <div key={locale.code} className="flex items-center">
          {index > 0 && <span className="text-white/40">|</span>}
          <button
            className={cn(
              "px-1 text-blue-primary transition-all duration-200 ease-in-out hover:scale-110 hover:text-xl",
              currentLocale === locale.code ? "text-xl font-bold" : ""
            )}
            disabled={currentLocale === locale.code}
            onClick={() => handleLocaleChange(locale.code)}
          >
            {locale.label}
          </button>
        </div>
      ))}
    </div>
  );
}

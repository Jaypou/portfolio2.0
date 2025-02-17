"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useScrollVisibility } from "@/hooks/useScrollVisibility";

const locales = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];
  const { isVisible, isLoading, isDesktop } = useScrollVisibility();

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div
      className={`fixed right-8 top-8 z-50 flex items-center gap-1 transition-all duration-300 ${
        !isLoading ? "opacity-100" : "opacity-0"
      } ${
        !isDesktop
          ? isVisible
            ? "translate-y-0 opacity-100"
            : "-translate-y-20 opacity-0"
          : ""
      }`}
    >
      {locales.map((locale, index) => (
        <div key={locale.code} className="flex items-center">
          {index > 0 && <span className="text-white/40">|</span>}
          <button
            onClick={() => handleLocaleChange(locale.code)}
            className={cn(
              "text-blue-primary px-1 transition-all duration-200 ease-in-out hover:scale-110 hover:text-xl",
              currentLocale === locale.code ? "text-xl font-bold" : ""
            )}
            disabled={currentLocale === locale.code}
          >
            {locale.label}
          </button>
        </div>
      ))}
    </div>
  );
}

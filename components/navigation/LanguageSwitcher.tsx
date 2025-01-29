"use client";

import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const locales = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
];

export default function LanguageSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname.split("/")[1];

  const handleLocaleChange = (locale: string) => {
    if (locale === currentLocale) return;
    const newPath = pathname.replace(`/${currentLocale}`, `/${locale}`);
    router.push(newPath);
  };

  return (
    <div className="fixed right-8 top-8 z-50 flex items-center ">
      {locales.map((locale, index) => (
        <div key={locale.code} className="flex items-center">
          {index > 0 && <span className="text-red-500">|</span>}
          <button
            onClick={() => handleLocaleChange(locale.code)}
            className={cn(
              "px-1 transition-all duration-200 hover:text-red-700",
              currentLocale === locale.code
                ? "font-bold text-red-400"
                : "text-red-500"
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

import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

import { Providers } from "../providers";

import { getDictionary } from "./public-dictionaries";
import DictionaryProvider from "./dictionary-provider";

import { GetProgressNavItems } from "@/constants/GetProgressNavConst";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import LanguageSwitcher from "@/components/navigation/LanguageSwitcher";
import ProgressNav from "@/components/navigation/ProgressNav";
import BackgroundEffects from "@/components/shared/BackgroundEffects";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

// export const viewport: Viewport = {
//   themeColor: [
//     { media: "(prefers-color-scheme: light)", color: "white" },
//     { media: "(prefers-color-scheme: dark)", color: "black" },
//   ],
// };

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale?: string }; // No Promise, and optional in case of issues
}) {
  const locale = params.locale ?? "en"; // Fallback to "en" if undefined

  const dictionary = await getDictionary(locale);
  const navItems = await GetProgressNavItems(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
          <BackgroundEffects />
          <ToastContainer />
          <DictionaryProvider dictionary={dictionary}>
            <ProgressNav navItems={navItems} />
            <LanguageSwitcher />
            {children}
          </DictionaryProvider>
        </Providers>
      </body>
    </html>
  );
}

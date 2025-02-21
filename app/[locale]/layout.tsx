import { Metadata } from "next";

import { GetProgressNavItems } from "@/constants/GetProgressNavConst";
import clsx from "clsx";
import { ToastContainer } from "react-toastify";

import { fontSans } from "@/config/fonts";

import LanguageSwitcher from "@/components/navigation/LanguageSwitcher";
import ProgressNav from "@/components/navigation/ProgressNav";
import BackgroundEffects from "@/components/shared/BackgroundEffects";

import "@/styles/globals.css";

import { Providers } from "../providers";
import DictionaryProvider from "./dictionary-provider";
import { getDictionary } from "./public-dictionaries";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale ?? "en";
  const dictionary = await getDictionary(locale);

  return {
    title: {
      default: dictionary.metadata.title,
      template: `%s - ${dictionary.metadata.title}`,
    },
    description: dictionary.metadata.description,
    icons: {
      icon: "/favicon.ico",
    },
  };
}

export default async function RootLayout(props: {
  children: React.ReactNode;
  params: Promise<{ locale?: string }>; // No Promise, and optional in case of issues
}) {
  const params = await props.params;

  const { children } = props;

  const locale = params.locale ?? "en"; // Fallback to "en" if undefined

  const dictionary = await getDictionary(locale);
  const navItems = await GetProgressNavItems(locale);

  return (
    <html suppressHydrationWarning lang={locale}>
      <head />
      <body
        className={clsx(
          "min-h-screen font-sans antialiased",
          fontSans.variable
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

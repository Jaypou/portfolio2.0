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

// export async function generateMetadata(props: {
//   params: Promise<{ locale: string }>;
// }): Promise<Metadata> {
//   const params = await props.params;
//   const locale = params.locale ?? "en";
//   const dictionary = await getDictionary(locale);

//   return {
//     title: {
//       default: dictionary.metadata.title,
//       template: `%s - ${dictionary.metadata.title}`,
//     },
//     description: dictionary.metadata.description,
//     icons: {
//       icon: "/favicon.ico",
//     },
//     metadataBase: new URL("https://jeremiepouliot.vercel.app"),
//     openGraph: {
//       title: dictionary.metadata.title,
//       description: dictionary.metadata.description,
//       url: "https://jeremiepouliot.vercel.app",
//       siteName: dictionary.metadata.title,
//       images: [
//         {
//           url: "https://jeremiepouliot.vercel.app/assets/favicons/Favicon.png",
//           width: 1200,
//           height: 630,
//           alt: `${dictionary.ProfilePicture} ${dictionary.Contact.ContactName}`,
//         },
//       ],
//       locale: locale,
//       type: "website",
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: dictionary.metadata.title,
//       description: dictionary.metadata.description,
//       images: ["https://jeremiepouliot.vercel.app/assets/favicons/Favicon.png"],
//       creator: "@JeremiePouliot",
//     },
//     alternates: {
//       canonical: "https://jeremiepouliot.vercel.app",
//       languages: {
//         "en-CA": "https://jeremiepouliot.vercel.app/en",
//         "fr-CA": "https://jeremiepouliot.vercel.app/fr",
//       },
//     },
//   };
// }

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const locale = params.locale ?? "en";

  return {
    title: {
      default:
        locale === "fr"
          ? "Jérémie Pouliot | Développeur web junior"
          : "Jérémie Pouliot | Junior Web Developer",
      template:
        locale === "fr"
          ? "%s - Jérémie Pouliot | Développeur web junior"
          : "%s - Jérémie Pouliot | Junior Web Developer",
    },
    description:
      locale === "fr"
        ? "Portfolio présentant mon parcours, mes compétences et mes expériences en tant que développeur web"
        : "Portfolio showcasing my journey, skills, and experiences as a web developer",
    icons: {
      icon: "/favicon.ico",
    },
    metadataBase: new URL("https://jeremiepouliot.vercel.app"),
    openGraph: {
      title:
        locale === "fr"
          ? "Jérémie Pouliot | Développeur web junior"
          : "Jérémie Pouliot | Junior Web Developer",
      description:
        locale === "fr"
          ? "Portfolio présentant mon parcours, mes compétences et mes expériences en tant que développeur web"
          : "Portfolio showcasing my journey, skills, and experiences as a web developer",
      url: "https://jeremiepouliot.vercel.app",
      siteName:
        locale === "fr"
          ? "Jérémie Pouliot | Développeur web junior"
          : "Jérémie Pouliot | Junior Web Developer",
      images: [
        {
          url: "https://jeremiepouliot.vercel.app/assets/favicons/Favicon.png",
          width: 1200,
          height: 630,
          alt:
            locale === "fr"
              ? "Photo de profil de Jérémie Pouliot"
              : "Profile picture of Jérémie Pouliot",
        },
      ],
      locale: locale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title:
        locale === "fr"
          ? "Jérémie Pouliot | Développeur web junior"
          : "Jérémie Pouliot | Junior Web Developer",
      description:
        locale === "fr"
          ? "Portfolio présentant mon parcours, mes compétences et mes expériences en tant que développeur web"
          : "Portfolio showcasing my journey, skills, and experiences as a web developer",
      images: ["https://jeremiepouliot.vercel.app/assets/favicons/Favicon.png"],
      creator: "@JeremiePouliot",
    },
    alternates: {
      canonical: "https://jeremiepouliot.vercel.app",
      languages: {
        en: "https://jeremiepouliot.vercel.app/en",
        fr: "https://jeremiepouliot.vercel.app/fr",
      },
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

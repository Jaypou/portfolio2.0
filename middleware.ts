import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";

// import { i18n } from "./i18n-config";
// const locales = i18n.locales;
// const defaultLocale = i18n.defaultLocale;

let locales = ["en-CA", "fr-CA", "en-US", "fr-FR"];
let defaultLocale = "en-CA";

// Get the preferred locale, similar to the above or using a library
function getLocale(request: NextRequest) {
  const acceptLanguage = request.headers.get("accept-language");
  const headers = { "accept-language": acceptLanguage || "" };
  let negotiator = new Negotiator({ headers });
  let preferredLanguages = negotiator.languages();

  // Match the best available locale, then normalize it
  let bestMatch = match(preferredLanguages, locales, defaultLocale);
  let simplifiedLocale = bestMatch.startsWith("en")
    ? "en"
    : bestMatch.startsWith("fr")
      ? "fr"
      : "en";

  return simplifiedLocale;
}

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;
  const isProduction = process.env.NODE_ENV === "production";
  if (
    isProduction &&
    pathname !== "/en" &&
    pathname !== "/fr" &&
    pathname !== "/"
  ) {
    return NextResponse.redirect(
      new URL("/" + getLocale(request), request.nextUrl)
    );
  }

  //   if (
  //     pathname.includes("reset-password-confirm") ||
  //     pathname.includes("confirm-email")
  //   ) {
  //     const searchParams = request.nextUrl.searchParams;
  //     const uid = searchParams.get("uid");
  //     const token = searchParams.get("token");
  //     const email = searchParams.get("email");

  //     if (!uid || !token || !email) {
  //       return NextResponse.redirect(new URL("/sign-in", request.nextUrl));
  //     }
  //     return;
  //   }

  // if pathname includes :locale then we remove it and the new url will be /{locale}/...
  if (pathname.includes(":locale")) {
    console.log("pathname includes :locale", pathname);

    request.nextUrl.pathname = pathname.replace("/:locale", "");
    return NextResponse.redirect(request.nextUrl);
  }

  if (pathname.startsWith("/en") || pathname.startsWith("/fr")) {
    return;
  }

  if (pathname.startsWith("/api")) {
    return;
  }

  const locale = getLocale(request);
  console.log("locale", locale);
  request.nextUrl.pathname = `/${locale}${pathname}`;

  return NextResponse.redirect(request.nextUrl);
};

const handleRequest = (request: NextRequest) => {
  return middleware(request);
};

export default handleRequest;

// Uncomment and use this if you want to include authMiddleware in the future
// export default authMiddleware({
//   beforeAuth: (req) => {
//     return middleware(req);
//   },

//   publicRoutes: [
//     "/",
//     "/:locale/sign-in",
//     "/:locale/sign-up",
//     "/:locale/about-us",
//     "/:locale/blogs",
//     "/:locale/blogs/:slug",
//     "/:locale/contact",
//     "/:locale/overview",
//     "/:locale/overview/:slug",
//     "/:locale/pricing",
//     "/:locale/cases-studies",
//     "/:locale/cases-studies/:slug",
//     "/:locale",
//     "/home",
//     "/:locale/home",
//     "/:locale/sentry-example-page",
//     "/:locale/error-page",
//     "/:locale/404",
//   ],
// });

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/((?!api|_next|_vercel|.*\\..*).*)",
    // "/(api|trpc)(.*)"
  ],
};

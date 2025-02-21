import { NextRequest, NextResponse } from "next/server";

import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";

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
    ? "fr"
    : bestMatch.startsWith("fr")
      ? "fr"
      : "en";

  return simplifiedLocale;
}

const middleware = (request: NextRequest) => {
  const { pathname } = request.nextUrl;

  // Skip middleware for api routes and static files
  if (pathname.startsWith("/api") || pathname.match(/\.[\w]+$/)) {
    return;
  }

  // If the pathname already starts with a valid locale, let it pass through
  if (
    pathname.startsWith("/en/") ||
    pathname.startsWith("/fr/") ||
    pathname === "/en" ||
    pathname === "/fr"
  ) {
    return;
  }

  // Handle :locale in pathname
  if (pathname.includes(":locale")) {
    request.nextUrl.pathname = pathname.replace("/:locale", "");

    return NextResponse.redirect(request.nextUrl);
  }

  // For the root path or paths without locale prefix, add the locale
  const locale = getLocale(request);

  request.nextUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  return NextResponse.redirect(request.nextUrl);
};

const handleRequest = (request: NextRequest) => {
  return middleware(request);
};

export default handleRequest;

export const config = {
  matcher: [
    "/((?!.+\\.[\\w]+$|_next).*)",
    "/",
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};

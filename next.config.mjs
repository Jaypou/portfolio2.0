/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    locales: ["en", "fr"], // Replace with your supported locales, e.g., 'en' for English, 'fr' for French
    defaultLocale: "en", // Set the default locale here
  },
  images: {
    domains: [
      "i.pravatar.cc",
      "images.unsplash.com",
      "unsplash.com",
      "source.unsplash.com",
      "assets.aceternity.com",
      "imgur.com",
    ],
  },
};

export default nextConfig;

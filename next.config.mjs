/** @type {import('next').NextConfig} */
const nextConfig = {
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
  i18n: {
    locales: ["en", "fr"], // Replace with your supported locales, e.g., 'en' for English, 'fr' for French
    defaultLocale: "en", // Set the default locale here
  },
};

export default nextConfig;

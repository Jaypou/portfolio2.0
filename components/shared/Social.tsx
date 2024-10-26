import IconComp from "./IconComp";
import React from "react";
import Link from "next/link";

interface SocialProps {
  hrefs: string[];
  className?: string;
  rotate?: boolean;
}

type SocialPlatform = {
  name: string;
  icon: string;
  colorClass: string;
  regex: RegExp;
};

const socialPlatforms: SocialPlatform[] = [
  {
    name: "youtube",
    icon: "mdi:youtube",
    colorClass: "text-[#FF0000]",
    regex: /(?:youtube\.com|youtu\.be)/i,
  },
  {
    name: "github",
    icon: "mdi:github",
    colorClass: "text-[#6e5494]",
    regex: /github\.com/i,
  },
  {
    name: "linkedin",
    icon: "mdi:linkedin",
    colorClass: "text-[#0077B5]",
    regex: /linkedin\.com/i,
  },
  {
    name: "twitter",
    icon: "mdi:twitter",
    colorClass: "text-[#1DA1F2]",
    regex: /(?:twitter\.com|x\.com)/i,
  },
  {
    name: "instagram",
    icon: "mdi:instagram",
    colorClass: "text-white",
    regex: /instagram\.com/i,
  },
  {
    name: "facebook",
    icon: "mdi:facebook",
    colorClass: "text-[#1877F2]",
    regex: /facebook\.com/i,
  },
  {
    name: "tiktok",
    icon: "logos:tiktok-icon",
    colorClass: "text-[#000000]",
    regex: /tiktok\.com/i,
  },
  {
    name: "pinterest",
    icon: "mdi:pinterest",
    colorClass: "text-[#E60023]",
    regex: /pinterest\.com/i,
  },
  {
    name: "reddit",
    icon: "ic:baseline-reddit",
    colorClass: "text-[#FF4500]",
    regex: /reddit\.com/i,
  },
  {
    name: "discord",
    icon: "ic:baseline-discord",
    colorClass: "text-[#5865F2]",
    regex: /discord\.com/i,
  },
  {
    name: "twitch",
    icon: "mdi:twitch",
    colorClass: "text-[#9146FF]",
    regex: /twitch\.tv/i,
  },
];

const Social: React.FC<SocialProps> = ({
  hrefs,
  className = "",
  rotate = false,
}) => {
  const getPlatform = (url: string): SocialPlatform | undefined => {
    return socialPlatforms.find((platform) => platform.regex.test(url));
  };

  return (
    <div className="flex gap-4">
      {hrefs.map((href, index) => {
        const platform = getPlatform(href);
        if (!platform) return null;

        const sizeClass = platform.name === "tiktok" ? "scale-[0.80]" : "";
        const rotationClass =
          index % 2 === 0 ? "hover:rotate-[30deg]" : "hover:rotate-[-30deg]";

        const linkClass =
          platform.name === "instagram"
            ? `group transition-all duration-500 hover:scale-110 scale-[0.85] ${rotationClass} bg-gradient-to-tr from-[#F77737] via-[#FD1D1D] to-[#833AB4] rounded-xl`
            : `group transition-all duration-500 hover:scale-[1.2] ${rotationClass}`;

        return (
          <Link
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={linkClass}
          >
            <IconComp
              icon={platform.icon}
              className={`
                ${platform.colorClass}
                ${className}
                ${sizeClass}
                transition-all duration-500
                hover:opacity-80
              `}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Social;

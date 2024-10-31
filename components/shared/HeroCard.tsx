import Image, { StaticImageData } from "next/image";

// This file is use with classnames in the Theme.css

interface HoverCardProps {
  coverImage: StaticImageData;
  titleImage: StaticImageData;
  characterImage: StaticImageData;
}

export default function HeroCard({
  coverImage,
  titleImage,
  characterImage,
}: HoverCardProps) {
  // Function to extract the file name from StaticImageData
  const extractName = (image: StaticImageData) => {
    const imageName = image.src.split("/").pop()?.split(".")[0];
    return imageName || "Image";
  };

  const coverName = extractName(coverImage);
  const titleName = extractName(titleImage);
  const characterName = extractName(characterImage);

  return (
    <div className="HeroCard group relative flex h-full w-full items-center justify-center">
      <div className="wrapper absolute z-[-1] w-full rounded-lg  shadow-lg shadow-black backdrop-blur-sm transition-all duration-400 group-hover:shadow-[0_100px_60px_-15px_rgba(0,0,0,0.8)]">
        <Image
          // src="https://ggayane.github.io/css-experiments/cards/force_mage-cover.jpg"
          src={coverImage}
          alt={coverName}
          className="cover-image h-full w-full scale-x-[-1] rounded-lg object-cover"
        />
        <div className="absolute top-0 h-full w-full rounded-lg from-black/10 to-black transition-all group-hover:bg-gradient-to-t group-hover:backdrop-blur-sm" />
      </div>
      <Image
        // src="https://ggayane.github.io/css-experiments/cards/force_mage-title.png"
        src={titleImage}
        alt={titleName}
        className="title absolute z-10 w-full translate-y-[150%] scale-110 transition-transform group-hover:translate-y-10 group-hover:scale-125"
      />
      <Image
        // src="https://ggayane.github.io/css-experiments/cards/force_mage-character.webp"
        src={characterImage}
        alt={characterName}
        className="character absolute z-[-1] opacity-0 transition-all duration-400 group-hover:translate-x-[-5%] group-hover:translate-y-[-7%] group-hover:scale-110 group-hover:opacity-100"
      />
    </div>
  );
}

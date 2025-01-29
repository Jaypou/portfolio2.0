"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { VideoBackground, TextOverlay } from "@/components";

interface VideoHeroProps {
  HeroTitle: string;
  HeroSubtitle: string;
  videoSource: string;
  videoClassnames?: string;
  textClassnames?: string;
  easeOptions?: string;
  fadeOutDuration: number;
}

const VideoHero: React.FC<VideoHeroProps> = ({
  HeroTitle,
  HeroSubtitle,
  videoSource,
  videoClassnames,
  textClassnames = "text-white",
  fadeOutDuration,
  easeOptions = "power1.inOut",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative h-[50vh] min-h-[400px] w-full overflow-hidden md:h-[60vh] lg:h-[65vh]"
    >
      <VideoBackground
        videoSource={videoSource}
        videoClassnames={videoClassnames}
        fadeOutDuration={fadeOutDuration}
        easeOptions={easeOptions}
      />
      <TextOverlay
        title={HeroTitle}
        subtitle={HeroSubtitle}
        textClassnames={textClassnames}
        containerRef={containerRef}
      />
    </div>
  );
};

export default VideoHero;

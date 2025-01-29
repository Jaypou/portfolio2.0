"use client";
import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";

interface VideoBackgroundProps {
  videoSource: string;
  videoClassnames?: string;
  fadeOutDuration: number;
  easeOptions?: string;
}

const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoSource,
  videoClassnames,
  fadeOutDuration,
  easeOptions = "power1.inOut",
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const videoElement = videoRef.current;
    if (!videoElement) return;

    gsap.fromTo(
      videoElement,
      { opacity: 0 },
      {
        opacity: 1,
        duration: fadeOutDuration,
        ease: easeOptions,
      }
    );
  }, [fadeOutDuration, easeOptions]);

  return (
    <div className="relative h-full w-full">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        className={`absolute h-full w-full object-cover ${videoClassnames}`}
      >
        <source src={videoSource} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black/10" />
    </div>
  );
};

export default VideoBackground;

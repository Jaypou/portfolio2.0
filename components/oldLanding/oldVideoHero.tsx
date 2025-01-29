"use client";
import React, { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { div } from "framer-motion/client";

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
  // const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [animationTimer, setAnimationTimer] = useState("0.000");
  const [videoTimer, setVideoTimer] = useState("0.000");

  const animationIntervalRef = useRef<number | null>(null);
  const videoIntervalRef = useRef<number | null>(null);

  const videoDuration = videoRef.current?.duration;
  // console.log("videoDuration", videoDuration);

  // Function to handle animation timer
  function startAnimationDebugTimer() {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
    }

    setAnimationTimer("0.000");
    let startTime = performance.now();

    animationIntervalRef.current = window.setInterval(() => {
      let currentTime = performance.now();
      let elapsedTime = (currentTime - startTime) / 1000;
      setAnimationTimer(elapsedTime.toFixed(3));
    }, 10);
  }

  function resetAnimationDebugTimer() {
    if (animationIntervalRef.current) {
      clearInterval(animationIntervalRef.current);
      animationIntervalRef.current = null;
    }
    setAnimationTimer("0.000");
  }

  // Function to handle video timer
  function startVideoDebugTimer() {
    if (videoIntervalRef.current) {
      clearInterval(videoIntervalRef.current);
    }

    setVideoTimer("0.000");
    let startTime = performance.now();

    videoIntervalRef.current = window.setInterval(() => {
      let currentTime = performance.now();
      let elapsedTime = (currentTime - startTime) / 1000;
      setVideoTimer(elapsedTime.toFixed(3));
    }, 10);
  }

  // Function to stop video timer
  function stopVideoDebugTimer() {
    if (videoIntervalRef.current) {
      clearInterval(videoIntervalRef.current);
      videoIntervalRef.current = null; // Reset the reference to indicate that the timer is stopped
    }
  }

  function resetVideoDebugTimer() {
    if (videoIntervalRef.current) {
      clearInterval(videoIntervalRef.current);
      videoIntervalRef.current = null;
    }
    setVideoTimer("0.000");
  }

  useEffect(() => {
    // const bgElement = bgRef.current;
    const videoElement = videoRef.current;
    startVideoDebugTimer();

    if (videoElement) {
      const fadeOut = () => {
        resetAnimationDebugTimer();
        startAnimationDebugTimer();

        gsap.fromTo(
          videoElement,
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: fadeOutDuration,
            ease: easeOptions,
          }
        );
      };

      // Handle video looping
      videoElement.addEventListener("ended", () => {
        // videoElement.currentTime = 0;
        // videoElement.play();
        stopVideoDebugTimer();
        // resetVideoDebugTimer();
        // startVideoDebugTimer();
        // fadeOut();
      });

      // Start timers when the video starts playing
      videoElement.addEventListener("play", () => {
        resetVideoDebugTimer();
        startVideoDebugTimer();
      });

      fadeOut();
    }

    return () => {
      resetAnimationDebugTimer();
      resetVideoDebugTimer();
    };
  }, [fadeOutDuration, easeOptions]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      {/* Video Section */}
      <div className="relative h-[60vh] w-full">
        <video
          ref={videoRef}
          autoPlay
          muted
          onPlay={() => {
            startVideoDebugTimer();
          }}
          className={`absolute h-full w-full object-cover ${videoClassnames}`}
        >
          <source src={videoSource} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Black background overlay */}
        {/* <div ref={bgRef} className="absolute inset-0 z-10 bg-black" /> */}
      </div>

      <div className="absolute inset-0 top-20 flex w-full flex-col px-10 text-4xl text-green-500">
        <div>Anim Timer : {animationTimer} s</div>
        <div>Video Timer : {videoTimer} s</div>
      </div>

      {/* Text Section */}
      <div
        className={`absolute left-1/2 top-1/2 z-20 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center ${textClassnames}`}
      >
        <h1 className="text-4xl font-bold md:text-6xl">{HeroTitle}</h1>
        <p className="mt-4 text-lg md:text-2xl">{HeroSubtitle}</p>
      </div>
    </div>
  );
};

export default VideoHero;

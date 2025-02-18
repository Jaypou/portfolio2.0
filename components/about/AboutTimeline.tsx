"use client";

import { useState } from "react";

import { useDictionary } from "@/app/[locale]/dictionary-provider";
import { TimelineEntry } from "@/constants/TimelineData";
import { AnimatePresence, PanInfo, motion } from "framer-motion";

import TimelineCard from "./TimelineCard";
import TimelineNavigation from "./TimelineNavigation";

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 400 : -400,
    opacity: 0,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 400 : -400,
    opacity: 0,
  }),
};

interface TimelineProps {
  timelineData: TimelineEntry[];
}

export default function AboutTimeline({ timelineData }: TimelineProps) {
  const dictionary = useDictionary();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [[page, direction], setPage] = useState([0, 0]);

  const paginate = (newDirection: number) => {
    const newIndex =
      (currentIndex + newDirection + timelineData.length) % timelineData.length;

    setPage([page + newDirection, newDirection]);
    setCurrentIndex(newIndex);
  };

  const handleNext = () => paginate(1);
  const handlePrev = () => paginate(-1);

  const handleDotClick = (index: number) => {
    setCurrentIndex(index);
  };

  const handleDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50;

    if (info.offset.x < -swipeThreshold) {
      paginate(1);
    } else if (info.offset.x > swipeThreshold) {
      paginate(-1);
    }
  };

  const currentEntry = timelineData[currentIndex];
  const getDictionaryKey = (key: string) => dictionary.About[key.split(".")[1]];

  return (
    <div aria-label="Timeline carousel" className="w-full" role="region">
      <div className="relative w-full overflow-hidden py-6 md:overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            animate="center"
            className="w-full touch-pan-y"
            custom={direction}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            exit="exit"
            initial="enter"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 50 },
              opacity: { duration: 0.15 },
            }}
            variants={slideVariants}
            onDragEnd={handleDragEnd}
          >
            <TimelineCard
              description={getDictionaryKey(currentEntry.descriptionKey)}
              title={getDictionaryKey(currentEntry.titleKey)}
              year={currentEntry.year}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <TimelineNavigation
        currentIndex={currentIndex}
        timelineData={timelineData}
        onDotClick={handleDotClick}
        onNext={handleNext}
        onPrev={handlePrev}
      />
    </div>
  );
}

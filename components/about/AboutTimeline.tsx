"use client";

import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";
import TimelineCard from "./TimelineCard";
import TimelineNavigation from "./TimelineNavigation";
import { useState } from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { TimelineEntry } from "@/constants/TimelineData";

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
    <div className="w-full" role="region" aria-label="Timeline carousel">
      <div className="relative w-full overflow-hidden py-6 md:overflow-visible">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 400, damping: 50 },
              opacity: { duration: 0.15 },
            }}
            className="w-full touch-pan-y"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
          >
            <TimelineCard
              year={currentEntry.year}
              title={getDictionaryKey(currentEntry.titleKey)}
              description={getDictionaryKey(currentEntry.descriptionKey)}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      <TimelineNavigation
        timelineData={timelineData}
        currentIndex={currentIndex}
        onNext={handleNext}
        onPrev={handlePrev}
        onDotClick={handleDotClick}
      />
    </div>
  );
}

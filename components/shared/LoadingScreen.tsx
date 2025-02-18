"use client";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // 1 second delay

    return () => clearTimeout(timer);
  }, []);

  if (!isLoading) return <>{children}</>;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ duration: 0.5, delay: 1 }}
      onAnimationComplete={() => setIsLoading(false)}
    >
      <div className="relative">
        {/* Outer circle */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#0066FF]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        />

        {/* Inner circle with pulse effect */}
        <motion.div
          className="absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0066FF]"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [0, 1, 0.8, 1],
            opacity: 1,
          }}
          transition={{
            duration: 1,
            times: [0, 0.4, 0.7, 1],
            repeat: Infinity,
          }}
        />

        {/* Text */}
        <motion.div
          className="absolute left-1/2 top-[calc(50%+3rem)] -translate-x-1/2 text-lg font-light text-white"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Loading...
        </motion.div>
      </div>
    </motion.div>
  );
};

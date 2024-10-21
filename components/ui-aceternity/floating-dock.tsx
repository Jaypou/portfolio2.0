/**
 * Note: Use position fixed according to your needs
 * Desktop navbar is better positioned at the bottom
 * Mobile navbar is better positioned at bottom right.
 **/

import { cn } from "@/lib/utils/cn";
// import { IconLayoutNavbarCollapse } from "@tabler/icons-react";
import IconComp from "@/components/shared/IconComp";
import {
  AnimatePresence,
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import Link from "next/link";
import { useRef, useState } from "react";

export const FloatingDock = ({
  items,
  desktopClassName,
  mobileClassName,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  desktopClassName?: string;
  mobileClassName?: string;
}) => {
  return (
    <>
      <FloatingDockDesktop items={items} className={desktopClassName} />
      <FloatingDockMobile items={items} className={mobileClassName} />
    </>
  );
};

const FloatingDockMobile = ({
  items,
  className,
  direction = "bottom", // Default is "bottom"
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
  direction?: "left" | "right" | "top" | "bottom"; // Prop for the direction
}) => {
  const [open, setOpen] = useState(false);

  // Determine classes for positioning based on direction
  const directionClasses = {
    bottom: "inset-x-0 top-full mt-2", // Default: expands downward
    top: "inset-x-0 bottom-full mb-2", // Expands upward
    left: "inset-y-0 right-full mr-2", // Expands left
    right: "inset-y-0 left-full ml-2", // Expands right
  };

  // Determine the translation (animation) based on the direction
  const translateY =
    direction === "top" ? 10 : direction === "bottom" ? -10 : 0;
  const translateX =
    direction === "left" ? 10 : direction === "right" ? -10 : 0;

  // Reverse items for 'left' or 'top' to make the animation flow correctly
  const itemsToRender =
    direction === "left" || direction === "top" ? [...items].reverse() : items;

  return (
    <div className={cn("relative block md:hidden", className)}>
      <AnimatePresence>
        {open && (
          <motion.div
            layoutId="nav"
            className={`absolute ${directionClasses[direction]} flex gap-2 ${
              direction === "left" || direction === "right"
                ? "flex-row"
                : "flex-col"
            }`}
          >
            {itemsToRender.map((item, idx) => (
              <motion.div
                key={item.title}
                initial={{
                  opacity: 0,
                  y: translateY, // Adjust y translation for up/down
                  x: translateX, // Adjust x translation for left/right
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                  x: 0,
                }}
                exit={{
                  opacity: 0,
                  y: translateY,
                  x: translateX,
                  transition: {
                    delay:
                      direction === "left" || direction === "top"
                        ? (items.length - 1 - idx) * 0.05
                        : idx * 0.05, // Reverse delay for left/top
                  },
                }}
                transition={{
                  delay:
                    direction === "left" || direction === "top"
                      ? (items.length - 1 - idx) * 0.05
                      : idx * 0.05, // Reverse delay for left/top
                }}
              >
                <Link
                  href={item.href}
                  key={item.title}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-900"
                >
                  <div className="h-4 w-4">{item.icon}</div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button
        onClick={() => setOpen(!open)}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-50 dark:bg-neutral-800"
      >
        <IconComp
          icon={"tabler:layout-navbar-collapse"}
          className="h-5 w-5 text-neutral-500 dark:text-neutral-400"
        />
      </button>
    </div>
  );
};

const FloatingDockDesktop = ({
  items,
  className,
}: {
  items: { title: string; icon: React.ReactNode; href: string }[];
  className?: string;
}) => {
  let mouseX = useMotionValue(Infinity);
  return (
    <motion.div
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        "mx-auto hidden h-16 items-end gap-4 rounded-2xl bg-gray-50 px-4 pb-3 dark:bg-neutral-900 md:flex",
        className
      )}
    >
      {items.map((item) => (
        <IconContainer mouseX={mouseX} key={item.title} {...item} />
      ))}
    </motion.div>
  );
};

function IconContainer({
  mouseX,
  title,
  icon,
  href,
}: {
  mouseX: MotionValue;
  title: string;
  icon: React.ReactNode;
  href: string;
}) {
  let ref = useRef<HTMLDivElement>(null);

  let distance = useTransform(mouseX, (val) => {
    let bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };

    return val - bounds.x - bounds.width / 2;
  });

  let widthTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  let heightTransform = useTransform(distance, [-150, 0, 150], [40, 80, 40]);

  let widthTransformIcon = useTransform(distance, [-150, 0, 150], [20, 40, 20]);
  let heightTransformIcon = useTransform(
    distance,
    [-150, 0, 150],
    [20, 40, 20]
  );

  let width = useSpring(widthTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let height = useSpring(heightTransform, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  let widthIcon = useSpring(widthTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });
  let heightIcon = useSpring(heightTransformIcon, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width, height }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="relative flex aspect-square items-center justify-center rounded-full bg-gray-200 dark:bg-neutral-800"
      >
        <AnimatePresence>
          {hovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 2, x: "-50%" }}
              className="absolute -top-8 left-1/2 w-fit -translate-x-1/2 whitespace-pre rounded-md border border-gray-200 bg-gray-100 px-2 py-0.5 text-xs text-neutral-700 dark:border-neutral-900 dark:bg-neutral-800 dark:text-white"
            >
              {title}
            </motion.div>
          )}
        </AnimatePresence>
        <motion.div
          style={{ width: widthIcon, height: heightIcon }}
          className="flex items-center justify-center"
        >
          {icon}
        </motion.div>
      </motion.div>
    </Link>
  );
}

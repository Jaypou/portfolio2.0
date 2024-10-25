"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Icon } from "@iconify/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface NavItem {
  name: string;
  href: string;
}

export default function Navbar({ navItems }: { navItems: NavItem[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const scrollDownThreshold = 1;
  const scrollUpThreshold = 2;

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const isScrolled = currentScrollY > 10;

      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      const scrollPercentage =
        (Math.abs(currentScrollY - lastScrollY) / viewportHeight) * 100;

      if (
        currentScrollY > lastScrollY &&
        scrollPercentage > scrollDownThreshold
      ) {
        setVisible(false);
      } else if (
        currentScrollY < lastScrollY &&
        scrollPercentage > scrollUpThreshold
      ) {
        setVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled, lastScrollY]);

  const variants = {
    visible: { y: 0 },
    hidden: { y: "-100%" },
  };

  const toggleLocale = () => {
    const currentLocale = pathname.startsWith("/fr") ? "fr" : "en";
    const newLocale = currentLocale === "en" ? "fr" : "en";
    const newPath = pathname.replace(`/${currentLocale}`, `/${newLocale}`);
    router.push(newPath);
  };

  return (
    <motion.div
      initial="visible"
      animate={visible ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`fixed right-0 top-0 z-[15] w-full bg-black/30 backdrop-blur-md transition-all duration-300`}
    >
      <nav className="mx-auto max-w-7xl px-4 py-4">
        <div className="flex items-center justify-end">
          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center gap-x-6">
              {navItems.map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  className="relative text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:text-red-500 hover:after:w-full"
                >
                  {item.name}
                </Link>
              ))}
              <button
                onClick={toggleLocale}
                className="relative text-white transition-colors duration-200 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-red-500 after:transition-all after:duration-300 hover:text-red-500 hover:after:w-full"
              >
                {pathname.startsWith("/fr") ? "EN" : "FR"}
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative h-10 w-10 text-white focus:outline-none"
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              <span className="sr-only">
                {isOpen ? "Close menu" : "Open menu"}
              </span>
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 transform transition duration-300 ease-in-out ${
                  isOpen ? "rotate-45" : "-translate-y-1.5"
                } bg-white`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 transform transition duration-300 ease-in-out ${
                  isOpen ? "opacity-0" : ""
                } bg-white`}
              />
              <span
                className={`absolute left-1/2 top-1/2 block h-0.5 w-6 -translate-x-1/2 transform transition duration-300 ease-in-out ${
                  isOpen ? "-rotate-45" : "translate-y-1.5"
                } bg-white`}
              />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden"
            >
              <div className="mt-4 flex flex-col space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-white transition-all duration-200 hover:bg-red-600 hover:pl-6"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    toggleLocale();
                    setIsOpen(false);
                  }}
                  className="block rounded-md px-3 py-2 text-left text-white transition-all duration-200 hover:bg-red-600 hover:pl-6"
                >
                  {pathname.startsWith("/fr")
                    ? "Switch to English"
                    : "Passer au français"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </motion.div>
  );
}

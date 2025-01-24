"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDictionary } from "@/app/[locale]/(public)/dictionary-provider";

interface EmailFormProps {
  onClose: () => void;
}

export default function EmailForm({ onClose }: EmailFormProps) {
  const dictionary = useDictionary();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    // TODO: Implement email sending functionality
    console.log("Form submitted:", data);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ type: "spring", duration: 0.5 }}
          className="relative w-full max-w-md translate-y-[-10%] rounded-2xl bg-gradient-to-br from-purple-900/90 to-pink-900/90 p-8 shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-gray-400 hover:text-white"
          >
            ✕
          </button>

          <h2 className="mb-6 text-2xl font-bold text-white">
            {dictionary.Contact.EmailForm.Title}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm text-gray-300">
                {dictionary.Contact.EmailForm.Name.Label}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="mt-1 w-full rounded-lg bg-purple-900/50 p-2 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder={dictionary.Contact.EmailForm.Name.Placeholder}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm text-gray-300">
                {dictionary.Contact.EmailForm.Email.Label}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="mt-1 w-full rounded-lg bg-purple-900/50 p-2 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder={dictionary.Contact.EmailForm.Email.Placeholder}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm text-gray-300">
                {dictionary.Contact.EmailForm.Message.Label}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={4}
                className="mt-1 w-full rounded-lg bg-purple-900/50 p-2 text-white placeholder-gray-400 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
                placeholder={dictionary.Contact.EmailForm.Message.Placeholder}
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-pink-600 px-6 py-3 text-lg font-semibold text-white transition hover:bg-pink-700"
            >
              {dictionary.Contact.EmailForm.Submit}
            </button>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

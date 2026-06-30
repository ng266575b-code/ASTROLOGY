"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";
import { Star } from "lucide-react";

const ASTROLOGERS = [
  { id: 1, name: "Dr. Surmadhur Pant", expertise: "Master Astrologer", rating: 5.0, image: "https://shivalikcollege.edu.in/wp-content/uploads/2025/05/PANT-SIR.png" }
];

export function AstrologerCarousel() {
  return (
    <div className="w-full overflow-x-auto pb-8 pt-4 px-4 scrollbar-hide flex justify-center">
      <div className="flex gap-6 min-w-max">
        {ASTROLOGERS.map((astro, idx) => (
          <motion.div
            key={astro.id}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 * idx, duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.05, rotateY: 5, rotateX: 5 }}
            style={{ perspective: 1000 }}
          >
            <GlassCard
              glowColor="aurora"
              className="w-64 p-6 flex flex-col items-center text-center cursor-pointer relative"
            >
              {/* Online indicator */}
              <div className="absolute top-4 right-4 flex items-center justify-center">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-aurora-green opacity-75"></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-aurora-green"></span>
              </div>

              <img
                src={astro.image}
                alt={astro.name}
                className="w-24 h-24 rounded-full border-2 border-white/20 mb-4 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
              />
              <h3 className="font-heading text-xl font-semibold mb-1">{astro.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{astro.expertise}</p>
              <div className="flex items-center gap-1 text-celestial-gold">
                <Star size={16} fill="currentColor" />
                <span className="font-bold text-sm">{astro.rating}</span>
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

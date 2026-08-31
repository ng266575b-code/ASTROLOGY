"use client";

import { motion } from "framer-motion";

export function NatalChartWheel() {
  return (
    <motion.div
      className="relative flex items-center justify-center w-[300px] h-[300px] md:w-[450px] md:h-[450px]"
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      {/* Outer Glow */}
      <div className="absolute inset-0 rounded-full bg-aurora-purple/10 blur-3xl" />
      <div className="absolute inset-10 rounded-full bg-celestial-gold/5 blur-2xl" />

      {/* Rotating SVG Chart */}
      <motion.svg
        viewBox="0 0 400 400"
        className="w-full h-full text-white/50 drop-shadow-[0_0_10px_rgba(157,0,255,0.4)]"
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
      >
        {/* Outer Circle */}
        <circle cx="200" cy="200" r="190" stroke="currentColor" strokeWidth="2" fill="none" />
        <circle cx="200" cy="200" r="185" stroke="currentColor" strokeWidth="1" strokeDasharray="5,5" fill="none" />
        
        {/* Zodiac divisions (12 houses) */}
        {Array.from({ length: 12 }).map((_, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const x1 = 200 + 70 * Math.cos(angle);
          const y1 = 200 + 70 * Math.sin(angle);
          const x2 = 200 + 190 * Math.cos(angle);
          const y2 = 200 + 190 * Math.sin(angle);
          return (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="1"
              opacity="0.5"
            />
          );
        })}

        {/* Inner Circle */}
        <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="2" fill="none" />
        
        {/* Center Mystic Element */}
        <path
          d="M 200 150 L 250 220 L 150 220 Z"
          fill="none"
          stroke="var(--color-celestial-gold)"
          strokeWidth="2"
          className="drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"
        />
        <path
          d="M 200 250 L 150 180 L 250 180 Z"
          fill="none"
          stroke="var(--color-aurora-green)"
          strokeWidth="2"
          className="drop-shadow-[0_0_8px_rgba(0,255,157,0.8)]"
        />
      </motion.svg>
    </motion.div>
  );
}

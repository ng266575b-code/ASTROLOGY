"use client";

import { motion } from "framer-motion";
import { GlassCard } from "./ui/GlassCard";

const CARDS = [
  { title: "Past", description: "The foundations of your current cosmic state.", delay: 0 },
  { title: "Present", description: "The energies surrounding you right now.", delay: 0.2 },
  { title: "Future", description: "The trajectory of your immediate timeline.", delay: 0.4 },
];

export function TarotSection() {
  return (
    <section id="tarot" className="py-24 px-6 lg:px-20 bg-[#0B0F19] relative overflow-hidden">
      {/* Mystical background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-aurora-green/5 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Digital <span className="text-aurora-green text-glow-gold">Tarot</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">Draw three cards to reveal the hidden threads of your journey.</p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-8 lg:gap-12 perspective-1000">
          {CARDS.map((card, idx) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 50, rotateY: 30 }}
              whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
              viewport={{ once: true }}
              transition={{ delay: card.delay, duration: 0.8, ease: "easeOut" }}
              whileHover={{ y: -20, scale: 1.05, rotateY: 10, rotateX: 10 }}
              className="w-64 h-96 cursor-pointer"
            >
              <GlassCard glowColor="gold" className="w-full h-full flex flex-col items-center justify-center p-6 border-2 border-celestial-gold/30 bg-black/40">
                <div className="w-16 h-16 mb-8 rounded-full bg-celestial-gold/10 flex items-center justify-center border border-celestial-gold/50 shadow-[0_0_15px_rgba(212,175,55,0.4)]">
                  <span className="text-2xl text-celestial-gold font-bold">{idx + 1}</span>
                </div>
                <h3 className="font-heading text-2xl font-bold text-celestial-gold mb-4 uppercase tracking-widest">{card.title}</h3>
                <p className="text-center text-sm text-gray-300">
                  {card.description}
                </p>
                <div className="mt-auto text-xs text-aurora-green animate-pulse uppercase tracking-widest">
                  Tap to Reveal
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import { motion } from "framer-motion";
import { AstrologerCarousel } from "./AstrologerCarousel";

export function PremiumGuidesSection() {
  return (
    <section id="guides" className="py-24 bg-[#050810] relative overflow-hidden">
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-aurora-purple/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto z-10 relative">
        <div className="text-center mb-16 px-6 lg:px-20">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-4xl md:text-5xl font-bold mb-4 text-white"
          >
            Premium Cosmic <span className="text-aurora-purple">Guides</span>
          </motion.h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Connect live with our vetted network of elite astrologers, tarot readers, and numerologists.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full"
        >
          <AstrologerCarousel />
        </motion.div>
      </div>
    </section>
  );
}

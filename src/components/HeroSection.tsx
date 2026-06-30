"use client";

import { motion } from "framer-motion";

export function HeroSection() {
  return (
    <section id="home" className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/planets.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Gradient transition at the bottom to blend into the next section */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-cosmic-blue to-transparent" />
      </div>

      <div className="relative z-10 flex flex-col h-full px-6 lg:px-20 pt-24 pb-12">

        {/* Main Content */}
        <div className="flex-1 flex flex-col justify-center max-w-4xl mt-12">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            className="text-5xl md:text-7xl font-heading font-bold leading-tight mb-6 text-glow-gold"
          >
            NAVIGATE YOUR<br />COSMIC TRAJECTORY
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl font-light"
          >
            Unlock the mysteries of the universe with our premium astrology platform. Experience AI-driven insights and connect with elite cosmic guides.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex items-center gap-6"
          >
            <button className="bg-celestial-gold hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.6)]">
              Connect with Expert
            </button>
            <button className="border border-white/30 hover:border-white text-white bg-white/5 backdrop-blur-md font-semibold py-4 px-8 rounded-full transition-colors">
              Explore Dashboard
            </button>
          </motion.div>
        </div>

      </div>
    </section>
  );
}

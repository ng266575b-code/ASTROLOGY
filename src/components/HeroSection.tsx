"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";

export function HeroSection() {
  const [showExpertModal, setShowExpertModal] = useState(false);

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
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <button 
              onClick={() => setShowExpertModal(true)}
              className="w-full sm:w-auto bg-celestial-gold hover:bg-yellow-500 text-black font-bold py-4 px-8 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_20px_rgba(212,175,55,0.6)]"
            >
              Connect with Expert
            </button>
            <a 
              href="#insights"
              className="w-full sm:w-auto text-center border border-white/30 hover:border-white text-white bg-white/5 backdrop-blur-md font-semibold py-4 px-8 rounded-full transition-colors"
            >
              Explore Dashboard
            </a>
          </motion.div>
        </div>

      </div>

      {/* Expert Modal Popup */}
      <AnimatePresence>
        {showExpertModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#0a0514] border border-celestial-gold/30 rounded-2xl p-8 max-w-sm w-full relative shadow-[0_0_40px_rgba(212,175,55,0.2)]"
            >
              <button 
                onClick={() => setShowExpertModal(false)}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
              
              <div className="w-16 h-16 mx-auto bg-celestial-gold/10 rounded-full flex items-center justify-center border border-celestial-gold/30 mb-4 shadow-[0_0_15px_rgba(212,175,55,0.3)]">
                <span className="text-3xl">🔮</span>
              </div>
              
              <h3 className="text-2xl font-heading font-bold text-white mb-2 text-center drop-shadow-md">Connect with Expert</h3>
              <p className="text-gray-400 text-center text-sm mb-6">Choose how you'd like to reach out to our premium cosmic guides.</p>
              
              <div className="flex flex-col gap-4">
                <Link 
                  href="/login"
                  className="flex items-center justify-center gap-3 w-full bg-[#25D366]/20 hover:bg-[#25D366]/30 border border-[#25D366]/50 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02]"
                >
                  <MessageCircle size={20} className="text-[#25D366]" />
                  WhatsApp Chat Available
                </Link>
                
                <Link 
                  href="/login"
                  className="flex items-center justify-center gap-3 w-full bg-aurora-purple/20 hover:bg-aurora-purple/30 border border-aurora-purple/50 text-white font-semibold py-3 rounded-xl transition-all hover:scale-[1.02]"
                >
                  <Phone size={20} className="text-aurora-purple" />
                  Call Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

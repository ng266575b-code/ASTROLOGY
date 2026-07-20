"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Link from "next/link";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? "bg-cosmic-blue/80 backdrop-blur-lg border-b border-white/10 shadow-lg" 
          : "bg-transparent pt-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-20 h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="#" className="text-2xl font-heading font-extrabold tracking-widest text-white drop-shadow-md cursor-pointer hover:text-celestial-gold transition-colors">
          ORBITAR
        </a>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {[
            { name: "Insights", id: "insights" },
            { name: "Kundli", id: "kundli" },
            { name: "Tarot", id: "tarot" },
            { name: "Match", id: "synastry" },
            { name: "Guides", id: "guides" }
          ].map((item) => (
            <a 
              key={item.id} 
              href={`#${item.id}`}
              className="text-sm font-semibold tracking-wider text-gray-300 hover:text-celestial-gold transition-colors uppercase"
            >
              {item.name}
            </a>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-4">
          <Link href="/login" className="hidden md:block text-sm font-semibold tracking-wider text-white hover:text-celestial-gold transition-colors">
            LOG IN
          </Link>
          <Link href="/login" className="bg-celestial-gold hover:bg-yellow-500 text-black text-sm font-bold py-2 px-6 rounded-full transition-transform hover:scale-105 active:scale-95 shadow-[0_0_15px_rgba(212,175,55,0.4)] inline-block">
            SIGN UP
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}

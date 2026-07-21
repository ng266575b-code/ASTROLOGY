"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Lock, X } from "lucide-react";
import Link from "next/link";

interface LoginRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  featureName: string;
}

export function LoginRequiredModal({ isOpen, onClose, featureName }: LoginRequiredModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0514] border border-red-500/30 rounded-2xl p-8 shadow-[0_0_50px_rgba(255,0,0,0.15)] text-center overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/10 blur-[50px] rounded-full pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <X size={24} />
            </button>

            <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 border-2 border-red-500 flex items-center justify-center text-red-500 mb-6 shadow-[0_0_20px_rgba(255,0,0,0.3)]">
              <Lock size={32} />
            </div>
            
            <h3 className="text-2xl font-heading font-bold text-white mb-4">Authentication Required</h3>
            <p className="text-gray-300 mb-8 leading-relaxed">
              To use this feature (<span className="text-celestial-gold font-bold">{featureName}</span>), firstly you login in website.
            </p>
            
            <div className="flex gap-4 justify-center">
              <button 
                onClick={onClose}
                className="px-6 py-2 rounded-full border border-white/20 text-white font-bold hover:bg-white/10 transition-colors"
              >
                Cancel
              </button>
              <Link 
                href="/login"
                className="px-6 py-2 rounded-full bg-celestial-gold text-black font-bold hover:bg-yellow-500 transition-colors shadow-[0_0_15px_rgba(212,175,55,0.4)]"
              >
                Go to Login
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

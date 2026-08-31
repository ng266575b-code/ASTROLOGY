"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, MessageCircle, PhoneCall } from "lucide-react";

interface ConnectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ConnectModal({ isOpen, onClose }: ConnectModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-md bg-[#0a0514] border border-white/10 rounded-2xl p-8 shadow-[0_0_50px_rgba(212,175,55,0.15)] overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-celestial-gold/10 blur-[50px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-aurora-purple/10 blur-[50px] rounded-full pointer-events-none" />
            
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-20"
            >
              <X size={24} />
            </button>

            <div className="text-center mb-8 relative z-10">
              <div className="w-20 h-20 mx-auto rounded-full border-2 border-celestial-gold p-1 mb-4">
                <img 
                  src="https://shivalikcollege.edu.in/wp-content/uploads/2025/05/PANT-SIR.png" 
                  alt="Sri Surmadhur Pant" 
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <h3 className="text-2xl font-heading font-bold text-white mb-1">Sri Surmadhur Pant</h3>
              <p className="text-sm text-celestial-gold font-semibold uppercase tracking-widest">Astrologer Consultant</p>
            </div>

            <div className="space-y-4 relative z-10">
              {/* Chat Option */}
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-aurora-purple/20 flex items-center justify-center text-aurora-purple group-hover:scale-110 transition-transform">
                    <MessageCircle size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Half an hour Chat</h4>
                    <p className="text-xs text-gray-400">Direct WhatsApp Session</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-celestial-gold">₹50</div>
              </div>

              {/* Call Option */}
              <div className="flex items-center justify-between p-4 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <PhoneCall size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-white">Direct Phone Call</h4>
                    <p className="text-xs text-gray-400">Detailed Audio Consultation</p>
                  </div>
                </div>
                <div className="text-lg font-bold text-celestial-gold">₹150</div>
              </div>
            </div>
            
            <p className="text-xs text-center text-gray-500 mt-6 relative z-10">
              Clicking an option will initiate a secure payment gateway.
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

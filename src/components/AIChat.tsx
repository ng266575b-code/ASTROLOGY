"use client";

import { useState } from "react";
import { GlassCard } from "./ui/GlassCard";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

export function AIChat() {
  const [messages, setMessages] = useState([
    { id: 1, text: "Welcome, traveler of the cosmos. I am the Orbitar Oracle. What cosmic secrets do you seek?", sender: "ai" }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim()) return;

    const userMsg = input.trim();
    setMessages(prev => [...prev, { id: Date.now(), text: userMsg, sender: "user" }]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          text: "The stars align favorably. Your current trajectory indicates a significant shift in your cosmic energy regarding this matter. Trust your intuition.", 
          sender: "ai" 
        }
      ]);
    }, 1500);
  };

  return (
    <GlassCard glowColor="aurora" className="flex flex-col h-[400px] overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center gap-3">
        <Bot className="text-aurora-purple" size={24} />
        <h3 className="font-heading text-lg font-semibold text-white">Orbitar AI Oracle</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-hide">
        {messages.map((msg) => (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            key={msg.id} 
            className={`max-w-[85%] p-3 rounded-lg text-sm ${
              msg.sender === "ai" 
                ? "bg-aurora-purple/20 text-gray-200 self-start border border-aurora-purple/30 rounded-tl-none" 
                : "bg-celestial-gold/20 text-white self-end border border-celestial-gold/30 rounded-tr-none"
            }`}
          >
            {msg.text}
          </motion.div>
        ))}
        {isTyping && (
          <div className="text-aurora-purple text-xs animate-pulse self-start p-2">
            The Oracle is reading the stars...
          </div>
        )}
      </div>

      <div className="p-4 border-t border-white/10">
        <form onSubmit={handleSend} className="flex items-center gap-2 relative">
          <input 
            type="text" 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask the cosmos..."
            className="w-full bg-black/40 border border-white/20 rounded-full py-3 pl-4 pr-12 text-sm text-white outline-none focus:border-celestial-gold transition-colors"
          />
          <button 
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-celestial-gold text-black rounded-full hover:scale-105 transition-transform"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </GlassCard>
  );
}

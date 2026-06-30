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

    const getAIResponse = (text: string) => {
      const lower = text.toLowerCase();
      if (lower.includes("love") || lower.includes("relationship") || lower.includes("partner")) {
        const responses = [
          "Venus is currently positioned to bring harmony to your connections. Be open to vulnerability.",
          "The cosmic energies suggest a period of reflection in matters of the heart. Seek balance within before seeking others.",
          "A significant alignment is approaching in your seventh house. New romantic possibilities are on the horizon."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      if (lower.includes("career") || lower.includes("job") || lower.includes("work")) {
        const responses = [
          "Saturn demands discipline right now. Stay focused on your long-term goals and the career breakthrough will follow.",
          "Jupiter is expanding your professional sector. It's a favorable time to take calculated risks in your career.",
          "Your midheaven is activated! Expect sudden recognition or a shift in your professional path soon."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      if (lower.includes("money") || lower.includes("finance") || lower.includes("wealth")) {
        const responses = [
          "The second house of finances is stabilizing. Focus on saving rather than impulsive spending this week.",
          "Cosmic currents suggest an unexpected financial opportunity may present itself. Stay vigilant.",
          "Abundance is a state of mind. As you align your energy with gratitude, material wealth will naturally follow."
        ];
        return responses[Math.floor(Math.random() * responses.length)];
      }
      const generic = [
        "The stars indicate a period of transformation. What you seek is already within your grasp.",
        "The universe hears your query, but the timing is not yet aligned for a clear answer. Patience is your greatest ally.",
        "A celestial shift is occurring. Trust your intuition, for your inner voice is currently attuned to the cosmic frequency.",
        "Mercury's current transit suggests you should communicate your intentions clearly to the universe to manifest your desires.",
        "The astral planes are vibrating with your question. The answer will come to you through a sudden realization today."
      ];
      return generic[Math.floor(Math.random() * generic.length)];
    };

    // Simulate AI response
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [
        ...prev, 
        { 
          id: Date.now() + 1, 
          text: getAIResponse(userMsg), 
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

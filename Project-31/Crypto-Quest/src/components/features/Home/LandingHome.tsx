import { CryptoCard } from '@/components/UI/CryptoCard';
import { Shield, Target, Trophy, Zap } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import { motion } from "framer-motion";

export default function LandingHome() {
      const navigate = useNavigate();
    
  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 matrix-rain opacity-50" />
        <div className="container mx-auto max-w-6xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-6xl font-bold text-gradient mb-6">
              Master Cryptography
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Learn encryption, hashing, and secure protocols through
              interactive challenges and real-world simulations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            <CryptoCard
              icon={Zap}
              title="Crypto Playground"
              description="Experiment with AES, RSA, SHA-256, and more in a safe environment"
              onClick={() => navigate("/playground")}
            />
            <CryptoCard
              icon={Target}
              title="Cipher Challenges"
              description="Crack codes and solve cryptographic puzzles from beginner to expert"
              onClick={() => navigate("/challenges")}
            />
            <CryptoCard
              icon={Shield}
              title="Protocol Simulators"
              description="Visualize TLS handshakes, JWT flows, and OAuth authentication"
              onClick={() => navigate("/simulators")}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-8 text-center"
          >
            <Trophy className="text-primary mx-auto mb-4" size={48} />
            <h2 className="text-2xl font-bold mb-2">Gamified Learning</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Earn XP, level up, maintain streaks, and collect badges as you
              progress through your cryptography journey
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

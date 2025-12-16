import { OperationType } from "@/pages/Playground";
import { motion } from "framer-motion";
import { FileKey, Hash, Key, Lock, ScrollText, Code } from "lucide-react";
import React from "react";

interface prop {
  activeOp: OperationType;
  setActiveOp: React.Dispatch<React.SetStateAction<OperationType>>;
}
export default function MapOperations({ setActiveOp, activeOp }: prop) {
  const operations = [
    { id: "classic", label: "Classic", icon: ScrollText },
    { id: "aes", label: "AES-GCM", icon: Lock },
    { id: "hash", label: "Hashing", icon: Hash },
    { id: "rsa", label: "RSA", icon: Key },
    { id: "hmac", label: "HMAC", icon: FileKey },
    { id: "morseCode", label: "Morse-code", icon: Code },
  ];
  return (
    <div className="grid grid-cols-2 md:flex md:justify-center gap-3 mb-8 select-none">
      {operations.map((op) => {
        const Icon = op.icon;
        return (
          <motion.button
            key={op.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveOp(op.id as OperationType)}
            className={`px-6 py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
              activeOp === op.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            <Icon size={18} />
            <span className="hidden sm:inline">{op.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  hmacSign,
} from "@/lib/crypto/webCryptoUtils";
import { ClassicCiphersPanel } from "@/components/features/playground/ClassicCiphersPanel";
import AlertAnimate from "@/components/UI/AlertAnimate";
import MapOperations from "@/components/features/playground/MapOperations";
import AESPlay from "@/components/features/playground/AESPlay";
import { Copy } from "lucide-react";
import { copyToClipboard } from "@/lib/storage/helper";
import HashPlay from "@/components/features/playground/HashPlay";
import RsaPlay from "@/components/features/playground/RsaPlay";
import HmacPlay from "@/components/features/playground/HmacPlay";
import MorseCode from "@/components/UI/MorseCode";

export type OperationType = "classic" | "aes" | "hash" | "rsa" | "hmac" | "morseCode";

export interface OperationResult {
  type: "success" | "error";
  message: string;
}

export default function Playground() {
  const [activeOp, setActiveOp] = useState<OperationType>("aes");
  const [result, setResult] = useState<OperationResult | null>(null);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold text-gradient mb-4">
            Crypto Playground
          </h1>
          <p className="text-muted-foreground">
            Experiment with cryptographic operations in a safe, interactive
            environment
          </p>
        </motion.div>

        <MapOperations activeOp={activeOp} setActiveOp={setActiveOp} />

        {result && (
          <AlertAnimate message={result?.message} type={result?.type} />
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={activeOp}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className="bg-card border border-border rounded-xl p-8"
          >
            {activeOp === "classic" && (
              <ClassicCiphersPanel onResult={setResult} />
            )}

            {activeOp === "aes" && <AESPlay setResult={setResult} />}

            {activeOp === "hash" && <HashPlay setResult={setResult} />}

            {activeOp === "rsa" && <RsaPlay setResult={setResult} />}

            {activeOp === "hmac" && <HmacPlay setResult={setResult}/>
            }
            {activeOp === "morseCode" && <MorseCode/>
            }
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

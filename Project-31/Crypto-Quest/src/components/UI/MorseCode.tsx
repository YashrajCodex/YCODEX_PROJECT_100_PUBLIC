import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRightLeft,
  CircleArrowUp,
  Copy,
  LucideMinusCircle,
  Plus,
  Radar,
} from "lucide-react";

/* ------------------ Morse Maps (unchanged) ------------------ */

const morseCodeMap: { [key: string]: string } = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  " ": "/",
};

const englishMap = Object.entries(morseCodeMap).reduce(
  (acc, [k, v]) => ({ ...acc, [v]: k }),
  {} as { [key: string]: string }
);

type ConvertDirection = "to-morse" | "to-english";

/* ------------------ Component ------------------ */

const MorseCode: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [direction, setDirection] = useState<ConvertDirection>("to-morse");
  const [copied, setCopied] = useState(false);

  const convertToMorse = useCallback(
    (text: string) =>
      text
        .toUpperCase()
        .split("")
        .map((c) => morseCodeMap[c] || "")
        .join(" "),
    []
  );

  const convertToEnglish = useCallback(
    (morse: string) =>
      morse
        .split(" / ")
        .map((w) =>
          w
            .split(" ")
            .map((c) => englishMap[c] || "")
            .join("")
        )
        .join(" "),
    []
  );

  const handleConvert = () => {
    if (!inputText.trim()) return setOutputText("");
    setOutputText(
      direction === "to-morse"
        ? convertToMorse(inputText)
        : convertToEnglish(inputText)
    );
  };

  const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mx-auto max-w-4xl rounded-2xl border border-slate-800 shadow-[0_0_40px_rgba(56,189,248,0.08)] p-8 space-y-8 backdrop-blur-xl"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Radar className="text-cyan-400" />
        <h2 className="text-2xl font-semibold text-slate-100">
          Morse Code Playground
        </h2>
      </div>

      {/* Input */}
      <div className="space-y-2">
        <label className="text-sm text-slate-400">
          Input {"{space for adding letters / numbers}"}
        </label>
        <textarea
          className={`w-full min-h-[120px] rounded-xl border border-slate-800 bg-[#0F172A] text-slate-100 placeholder-slate-500 p-4 focus:outline-none focus:ring-2 focus:ring-cyan-500/40 ${
            inputText ? "text-5xl" : "text-2xl"
          }`}
          placeholder={
            direction === "to-morse"
              ? "Type English text..."
              : ".... . .-.. .-.. --- / .-- --- .-. .-.. -.."
          }
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        {/* Clear-input */}
        <motion.button
          onClick={() => {
            setInputText("");
            setOutputText("");
          }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.95 }}
          className="absolute top-16 right-10 rounded-lg bg-[#0B1220]/80 p-2 text-slate-200"
        >
          <LucideMinusCircle size={18} />
        </motion.button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <ArrowRightLeft className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value as ConvertDirection)}
            className="w-full appearance-none rounded-xl border border-slate-800 bg-[#0F172A] text-slate-100 pl-12 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-cyan-500/40"
          >
            <option value="to-morse">English → Morse</option>
            <option value="to-english">Morse → English</option>
          </select>
        </div>

        <motion.button
          onClick={handleConvert}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 px-6 py-3 font-medium text-black shadow-lg"
        >
          <CircleArrowUp />
          Convert
        </motion.button>
      </div>

      {/* Output */}
      <div className="relative space-y-2">
        <div className="flex justify-between">
          <label className="text-sm text-slate-400">Output</label>
          <div className="flex gap-3">
            {/* Copy-button */}
            <motion.button
              onClick={handleCopy}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="rounded-lg bg-[#0B1220]/80 p-2 text-slate-200"
            >
              <Copy size={18} />
            </motion.button>
          </div>
        </div>
        <textarea
          readOnly
          value={outputText}
          placeholder="[?]"
          className={`w-full min-h-[120px] rounded-xl border border-slate-800 bg-gradient-to-b from-[#0E1629]/90 to-[#0B1220]/90 opacity-60 text-slate-100 font-semibold ${
            outputText ? "text-5xl" : "text-2xl"
          } p-4`}
        />

        <AnimatePresence>
          {copied && (
            <motion.span
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="absolute -bottom-6 right-0 text-xs text-cyan-400"
            >
              Copied to clipboard
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MorseCode;

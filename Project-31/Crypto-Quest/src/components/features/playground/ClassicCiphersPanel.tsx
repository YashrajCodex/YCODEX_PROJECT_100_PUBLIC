import { useState } from "react";
import { Copy, Eraser, EyeClosed, RefreshCw } from "lucide-react";
import {
  caesarEncrypt,
  caesarDecrypt,
  vigenereEncrypt,
  vigenereDecrypt,
  otpEncrypt,
  otpDecrypt,
  generateOtpKey,
} from "@/lib/crypto/classicCiphers";
import AddAsChallenge from "./AddAsChallenge";
import { Challenge, challenges } from "@/data/challenges";
import { v4 as uuidv4 } from "uuid";

type CipherType = "caesar" | "vigenere" | "otp";

interface ClassicCiphersPanelProps {
  onResult: (result: { type: "success" | "error"; message: string }) => void;
}

export function ClassicCiphersPanel({ onResult }: ClassicCiphersPanelProps) {
  const [cipherType, setCipherType] = useState<CipherType>("caesar");
  const [mode, setMode] = useState<"encrypt" | "decrypt">("encrypt");

  // Caesar state
  const [caesarText, setCaesarText] = useState("");
  const [caesarShift, setCaesarShift] = useState(3);
  const [caesarOutput, setCaesarOutput] = useState("");

  const newCipher: Challenge = {
    cId: uuidv4(),
    title: "Caesar's Message",
    description: `Decrypt the message encrypted with Caesar cipher (shift of ${caesarShift})`,
    difficulty: "easy",
    category: "classic",
    xpReward: 100,
    prompt: mode === "encrypt" ? caesarOutput : caesarText,
    hint1: `Try shifting each letter back by ${caesarShift} positions in the alphabet`,
    solution: mode === "encrypt" ? caesarText : caesarOutput,
    explanation: `Caesar cipher shifts each letter by a fixed number. Here, shift=${caesarShift} was used. To decrypt, shift by ${caesarShift}. This cipher is extremely weak and should never be used for real security.`,
  };
  // Vigenère state
  const [vigenereText, setVigenereText] = useState("");
  const [vigenereKey, setVigenereKey] = useState("");
  const [vigenereOutput, setVigenereOutput] = useState("");

  // OTP state
  const [otpText, setOtpText] = useState("");
  const [otpKey, setOtpKey] = useState("");
  const [otpOutput, setOtpOutput] = useState("");

  function handleCaesar() {
    const result =
      mode === "encrypt"
        ? caesarEncrypt(caesarText, caesarShift)
        : caesarDecrypt(caesarText, caesarShift);
    setCaesarOutput(result);
    onResult({ type: "success", message: `Caesar ${mode}ion successful!` });
  }

  function handleVigenere() {
    if (!vigenereKey.trim()) {
      onResult({ type: "error", message: "Please enter a key" });
      return;
    }
    const result =
      mode === "encrypt"
        ? vigenereEncrypt(vigenereText, vigenereKey)
        : vigenereDecrypt(vigenereText, vigenereKey);
    setVigenereOutput(result);
    onResult({ type: "success", message: `Vigenère ${mode}ion successful!` });
  }

  function handleOtp() {
    if (!otpKey.trim()) {
      onResult({ type: "error", message: "Please enter or generate a key" });
      return;
    }

    if (mode === "encrypt") {
      const result = otpEncrypt(otpText, otpKey);
      if (result.error) {
        onResult({ type: "error", message: result.error });
        return;
      }
      setOtpOutput(result.ciphertext);
    } else {
      const result = otpDecrypt(otpText, otpKey);
      if (result.error) {
        onResult({ type: "error", message: result.error });
        return;
      }
      setOtpOutput(result.plaintext);
    }

    onResult({
      type: "success",
      message: `One-Time Pad ${mode}ion successful!`,
    });
  }

  function generateKey() {
    const cleanText = otpText.toUpperCase().replace(/[^A-Z]/g, "");
    const keyLength = Math.max(cleanText.length, 10);
    setOtpKey(generateOtpKey(keyLength));
    onResult({
      type: "success",
      message: `Generated ${keyLength}-character random key`,
    });
  }

  function handleInputClear(cipherType: "caesar" | "vigenere" | "otp") {
    switch (cipherType) {
      case "caesar":
        setCaesarOutput("");
        setCaesarText("");
        setCaesarShift(3);
        break;
      case "vigenere":
        setVigenereText("");
        setVigenereKey("");
        setVigenereOutput("");
        break;

      default:
        setOtpKey("");
        setOtpText("");
        setOtpOutput("");
        break;
    }
  }
  function copyToClipboard(text: string) {
    navigator.clipboard.writeText(text);
    onResult({ type: "success", message: "Copied to clipboard!" });
  }

  const cipherTabs = [
    { id: "caesar", label: "Caesar" },
    { id: "vigenere", label: "Vigenère" },
    { id: "otp", label: "One-Time Pad" },
  ];

  return (
    <div className="space-y-6">
      <div className="select-none">
        <h2 className="text-2xl font-bold mb-2">Classic Ciphers</h2>
        <p className="text-muted-foreground text-sm mb-4">
          ⚠️ <strong>Educational Only:</strong> These ciphers are historically
          important but NOT secure for modern use. They demonstrate fundamental
          concepts.
        </p>
      </div>

      {/* Cipher type selection */}
      <div className="flex flex-wrap gap-2 mb-4 select-none">
        {cipherTabs.map((cipher) => (
          <button
            key={cipher.id}
            onClick={() => setCipherType(cipher.id as CipherType)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              cipherType === cipher.id
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-muted-foreground hover:bg-secondary/80"
            }`}
          >
            {cipher.label}
          </button>
        ))}
      </div>

      {/* Mode selection */}
      <div className="flex gap-4 mb-4 select-none">
        <button
          onClick={() => setMode("encrypt")}
          className={`px-4 py-2 rounded-lg ${
            mode === "encrypt"
              ? "bg-accent text-accent-foreground"
              : "bg-secondary"
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setMode("decrypt")}
          className={`px-4 py-2 rounded-lg ${
            mode === "decrypt"
              ? "bg-accent text-accent-foreground"
              : "bg-secondary"
          }`}
        >
          Decrypt
        </button>
      </div>

      {/* Caesar Cipher */}
      {cipherType === "caesar" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 text-sm">
            <strong>How it works:</strong> Each letter is shifted by a fixed
            number in the alphabet. With shift=3, A→D, B→E, etc. Named after
            Julius Caesar who used it.
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
            </label>
            <textarea
              value={caesarText}
              onChange={(e) => setCaesarText(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
              placeholder={`Enter text to ${mode}...`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Shift Value: {caesarShift}
            </label>
            <input
              type="range"
              min="1"
              max="25"
              value={caesarShift}
              onChange={(e) => setCaesarShift(Number(e.target.value))}
              className="w-full accent-primary"
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-1">
              <span>1</span>
              <span>13 (ROT13)</span>
              <span>25</span>
            </div>
          </div>

          {caesarOutput && (
            <div>
              <label className="text-sm font-medium mb-2 flex items-center justify-between">
                {mode === "encrypt" ? "Ciphertext" : "Plaintext"}
                <div className="flex gap-2">
                  <button
                    onClick={() => copyToClipboard(caesarOutput)}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                  >
                    <Copy size={14} /> Copy
                  </button>
                  <button
                    onClick={() => handleInputClear("caesar")}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                  >
                    <Eraser size={14} />
                    Clear
                  </button>
                  {/* <AddAsChallenge cl={newCipher} /> */}
                </div>
              </label>
              <textarea
                value={caesarOutput}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[100px] text-success"
              />
            </div>
          )}

          <button
            onClick={handleCaesar}
            disabled={!caesarText.trim()}
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
          >
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        </div>
      )}

      {/* Vigenère Cipher */}
      {cipherType === "vigenere" && (
        <div className="space-y-4">
          <div className="bg-secondary/30 rounded-lg p-4 text-sm">
            <strong>How it works:</strong> Uses a keyword to create multiple
            Caesar shifts. Each letter of the key determines the shift for
            corresponding plaintext letter. Much stronger than Caesar but still
            breakable with frequency analysis.
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === "encrypt" ? "Plaintext" : "Ciphertext"}
            </label>
            <textarea
              value={vigenereText}
              onChange={(e) => setVigenereText(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
              placeholder={`Enter text to ${mode}...`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Keyword</label>
            <input
              type="text"
              value={vigenereKey}
              onChange={(e) => setVigenereKey(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono"
              placeholder="Enter keyword (e.g., SECRET)..."
            />
          </div>

          {vigenereOutput && (
            <div>
              <label className="text-sm font-medium mb-2 flex items-center justify-between">
                {mode === "encrypt" ? "Ciphertext" : "Plaintext"}
                <div className="flex gap-4">
                  <button
                    onClick={() => copyToClipboard(vigenereOutput)}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                  >
                    <Copy size={14} /> Copy
                  </button>
                  <button
                    onClick={() => handleInputClear("vigenere")}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                  >
                    <Eraser size={14} />
                    Clear
                  </button>
                </div>
              </label>
              <textarea
                value={vigenereOutput}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[100px] text-success"
              />
            </div>
          )}

          <button
            onClick={handleVigenere}
            disabled={!vigenereText.trim() || !vigenereKey.trim()}
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
          >
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        </div>
      )}

      {/* One-Time Pad */}
      {cipherType === "otp" && (
        <div className="space-y-4">
          <div className="bg-success/10 border border-success/20 rounded-lg p-4 text-sm">
            <strong>Theoretically Unbreakable!</strong> When used correctly, OTP
            is the only cipher proven to be mathematically unbreakable.
            Requirements: key must be truly random, at least as long as the
            message, never reused, and kept secret.
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {mode === "encrypt" ? "Plaintext" : "Ciphertext"} (letters only)
            </label>
            <textarea
              value={otpText}
              onChange={(e) => setOtpText(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
              placeholder={`Enter text to ${mode} (A-Z only)...`}
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 flex items-center justify-between">
              Key (must be ≥ message length)
              <button
                onClick={generateKey}
                className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
              >
                <RefreshCw size={14} /> Generate Random Key
              </button>
            </label>
            <textarea
              value={otpKey}
              onChange={(e) => setOtpKey(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[80px]"
              placeholder="Enter or generate key..."
            />
            <p className="text-xs text-muted-foreground mt-1">
              Key length: {otpKey.replace(/[^A-Za-z]/g, "").length} | Message
              length: {otpText.replace(/[^A-Za-z]/g, "").length}
            </p>
          </div>

          {otpOutput && (
            <div>
              <label className="text-sm font-medium mb-2 flex items-center justify-between">
                {mode === "encrypt" ? "Ciphertext" : "Plaintext"}
                <div className="flex gap-3">
                  <button
                    onClick={() => copyToClipboard(otpOutput)}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                  >
                    <Copy size={14} /> Copy
                  </button>
                  <button
                    onClick={() => handleInputClear("otp")}
                    className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                  >
                    <Eraser size={14} />
                    Clear
                  </button>
                </div>
              </label>
              <textarea
                value={otpOutput}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[80px] text-success"
              />
            </div>
          )}

          <button
            onClick={handleOtp}
            disabled={!otpText.trim() || !otpKey.trim()}
            className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
          >
            {mode === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        </div>
      )}
    </div>
  );
}

import { useState } from "react";
import { Copy } from "lucide-react";

import { copyToClipboard } from "@/lib/storage/helper";
import { sha256Hash, sha512Hash } from "@/lib/crypto/webCryptoUtils";
import { OperationResult } from "@/pages/Playground";

interface HashPlayProp {
  setResult: React.Dispatch<React.SetStateAction<OperationResult>>;
}
export default function HashPlay({setResult}: HashPlayProp) {
  // Hash state
  const [hashInput, setHashInput] = useState("");
  const [hashOutput, setHashOutput] = useState("");
  const [hashAlgo, setHashAlgo] = useState<"sha256" | "sha512">("sha256");

  async function handleHash() {
    const hashFunc = hashAlgo === "sha256" ? sha256Hash : sha512Hash;
    const res = await hashFunc(hashInput);
    if (res.success && res.data) {
      setHashOutput(res.data);
      setResult({ type: "success", message: "Hash computed successfully!" });
    } else {
      setResult({ type: "error", message: res.error || "Hashing failed" });
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Cryptographic Hashing</h2>
        <p className="text-muted-foreground text-sm mb-4">
          ⚠️ <strong>Security Note:</strong> Hashes are one-way. Use for
          integrity checks, not for password storage (use PBKDF2/Argon2 for
          passwords).
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setHashAlgo("sha256")}
          className={`px-4 py-2 rounded-lg ${
            hashAlgo === "sha256"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          SHA-256
        </button>
        <button
          onClick={() => setHashAlgo("sha512")}
          className={`px-4 py-2 rounded-lg ${
            hashAlgo === "sha512"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          SHA-512
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Input Message</label>
        <textarea
          value={hashInput}
          onChange={(e) => setHashInput(e.target.value)}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
          placeholder="Enter text to hash..."
        />
      </div>

      {hashOutput && (
        <div>
          <label className="text-sm font-medium mb-2 flex items-center justify-between">
            Hash Output ({hashAlgo.toUpperCase()})
            <button
              onClick={() => copyToClipboard(hashOutput)}
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
            >
              <Copy size={14} /> Copy
            </button>
          </label>
          <textarea
            value={hashOutput}
            readOnly
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[80px] text-success break-all"
          />
        </div>
      )}

      <button
        onClick={handleHash}
        disabled={!hashInput}
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
      >
        Compute Hash
      </button>
    </div>
  );
}

import { hmacSign } from "@/lib/crypto/webCryptoUtils";
import { copyToClipboard } from "@/lib/storage/helper";
import { OperationResult } from "@/pages/Playground";
import { Copy } from "lucide-react";
import React, { useState } from "react";

interface HmacPlayProp {
  setResult: React.Dispatch<React.SetStateAction<OperationResult>>;
}
export default function HmacPlay({setResult}: HmacPlayProp) {
  // HMAC state
  const [hmacMessage, setHmacMessage] = useState("");
  const [hmacKey, setHmacKey] = useState("");
  const [hmacSignature, setHmacSignature] = useState("");

  async function handleHmacSign() {
    const res = await hmacSign(hmacMessage, hmacKey);
    if (res.success && res.data) {
      setHmacSignature(res.data);
      setResult({ type: "success", message: "HMAC signature generated!" });
    } else {
      setResult({ type: "error", message: res.error || "HMAC failed" });
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">HMAC (SHA-256)</h2>
        <p className="text-muted-foreground text-sm mb-4">
          ⚠️ <strong>Security Note:</strong> HMAC provides message
          authentication. Use strong secret keys and keep them secure.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Message</label>
        <textarea
          value={hmacMessage}
          onChange={(e) => setHmacMessage(e.target.value)}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
          placeholder="Enter message to sign..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Secret Key</label>
        <input
          type="password"
          value={hmacKey}
          onChange={(e) => setHmacKey(e.target.value)}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono"
          placeholder="Enter secret key..."
        />
      </div>

      {hmacSignature && (
        <div>
          <label className="text-sm font-medium mb-2 flex items-center justify-between">
            HMAC Signature
            <button
              onClick={() => copyToClipboard(hmacSignature)}
              className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
            >
              <Copy size={14} /> Copy
            </button>
          </label>
          <textarea
            value={hmacSignature}
            readOnly
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[60px] text-success break-all"
          />
        </div>
      )}

      <button
        onClick={handleHmacSign}
        disabled={!hmacMessage || !hmacKey}
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
      >
        Generate HMAC
      </button>
    </div>
  );
}

import { aesGcmDecrypt, aesGcmEncrypt } from "@/lib/crypto/webCryptoUtils";
import { copyToClipboard } from "@/lib/storage/helper";
import { OperationResult } from "@/pages/Playground";
import { Copy } from "lucide-react";
import React, { useState } from "react";

interface AesProp {
  setResult: React.Dispatch<React.SetStateAction<OperationResult>>;
}

export default function AESPlay({ setResult }: AesProp) {
  //AES States

  const [aesPlaintext, setAesPlaintext] = useState("");
  const [aesPassword, setAesPassword] = useState("");
  const [aesCiphertext, setAesCiphertext] = useState("");
  const [aesMode, setAesMode] = useState<"encrypt" | "decrypt">("encrypt");

  //AES HANDLER FUNCTION
  async function handleAesOperation() {
    if (aesMode === "encrypt") {
      const res = await aesGcmEncrypt(aesPlaintext, aesPassword);
      if (res.success && res.data) {
        setAesCiphertext(res.data);
        setResult({ type: "success", message: "Encryption successful!" });
      } else {
        setResult({ type: "error", message: res.error || "Encryption failed" });
      }
    } else {
      const res = await aesGcmDecrypt(aesCiphertext, aesPassword);
      if (res.success && res.data) {
        setAesPlaintext(res.data);
        setResult({ type: "success", message: "Decryption successful!" });
      } else {
        setResult({ type: "error", message: res.error || "Decryption failed" });
      }
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">AES-GCM Encryption</h2>
        <p className="text-muted-foreground text-sm mb-4">
          ⚠️ <strong>Security Note:</strong> Each encryption uses a unique IV.
          Never reuse passwords. Use PBKDF2 for key derivation.
        </p>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          onClick={() => setAesMode("encrypt")}
          className={`px-4 py-2 rounded-lg ${
            aesMode === "encrypt"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setAesMode("decrypt")}
          className={`px-4 py-2 rounded-lg ${
            aesMode === "decrypt"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Decrypt
        </button>
      </div>

      {aesMode === "encrypt" ? (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Plaintext</label>
            <textarea
              value={aesPlaintext}
              onChange={(e) => setAesPlaintext(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
              placeholder="Enter text to encrypt..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={aesPassword}
              onChange={(e) => setAesPassword(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono"
              placeholder="Enter encryption password..."
            />
          </div>
          {aesCiphertext && (
            <div>
              <label className="text-sm font-medium mb-2 flex items-center justify-between">
                Ciphertext (Base64)
                <button
                  onClick={() => {
                    copyToClipboard(aesCiphertext);
                    setResult({
                      type: "success",
                      message: "Copied to clipboard!",
                    });
                  }}
                  className="text-primary hover:text-primary/80 flex items-center gap-1 text-xs"
                >
                  <Copy size={14} /> Copy
                </button>
              </label>
              <textarea
                value={aesCiphertext}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[100px] text-success"
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">
              Ciphertext (Base64)
            </label>
            <textarea
              value={aesCiphertext}
              onChange={(e) => setAesCiphertext(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[100px]"
              placeholder="Paste ciphertext to decrypt..."
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>
            <input
              type="password"
              value={aesPassword}
              onChange={(e) => setAesPassword(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono"
              placeholder="Enter decryption password..."
            />
          </div>
          {aesPlaintext && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Decrypted Plaintext
              </label>
              <textarea
                value={aesPlaintext}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[100px] text-success"
              />
            </div>
          )}
        </>
      )}

      <button
        onClick={handleAesOperation}
        disabled={
          !aesPassword ||
          (aesMode === "encrypt" ? !aesPlaintext : !aesCiphertext)
        }
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
      >
        {aesMode === "encrypt" ? "Encrypt" : "Decrypt"}
      </button>
    </div>
  );
}

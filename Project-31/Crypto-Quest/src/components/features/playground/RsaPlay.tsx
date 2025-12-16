import {
  generateRsaKeyPair,
  rsaDecrypt,
  rsaEncrypt,
} from "@/lib/crypto/webCryptoUtils";
import { OperationResult } from "@/pages/Playground";
import React, { useState } from "react";

interface RsaPlayProp {
  setResult: React.Dispatch<React.SetStateAction<OperationResult>>;
}
export default function RsaPlay({ setResult }: RsaPlayProp) {
  // RSA state
  const [rsaPublicKey, setRsaPublicKey] = useState("");
  const [rsaPrivateKey, setRsaPrivateKey] = useState("");
  const [rsaPlaintext, setRsaPlaintext] = useState("");
  const [rsaCiphertext, setRsaCiphertext] = useState("");
  const [rsaMode, setRsaMode] = useState<"encrypt" | "decrypt">("encrypt");

  async function handleRsaOperation() {
    if (rsaMode === "encrypt") {
      const res = await rsaEncrypt(rsaPlaintext, rsaPublicKey);
      if (res.success && res.data) {
        setRsaCiphertext(res.data);
        setResult({ type: "success", message: "RSA encryption successful!" });
      } else {
        setResult({ type: "error", message: res.error || "Encryption failed" });
      }
    } else {
      const res = await rsaDecrypt(rsaCiphertext, rsaPrivateKey);
      if (res.success && res.data) {
        setRsaPlaintext(res.data);
        setResult({ type: "success", message: "RSA decryption successful!" });
      } else {
        setResult({ type: "error", message: res.error || "Decryption failed" });
      }
    }
  }
  async function handleGenerateRsaKeys() {
    setResult({
      type: "success",
      message: "Generating RSA keys... This may take a moment.",
    });
    const keys = await generateRsaKeyPair();
    if (keys) {
      setRsaPublicKey(keys.publicKey);
      setRsaPrivateKey(keys.privateKey);
      setResult({ type: "success", message: "RSA key pair generated!" });
    } else {
      setResult({ type: "error", message: "Failed to generate keys" });
    }
  }
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">RSA-OAEP Encryption</h2>
        <p className="text-muted-foreground text-sm mb-4">
          ⚠️ <strong>Security Note:</strong> Use minimum 2048-bit keys. RSA is
          slow for large data - typically used to encrypt symmetric keys.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <button
          onClick={handleGenerateRsaKeys}
          className="px-4 py-2 bg-accent text-accent-foreground rounded-lg font-medium"
        >
          Generate Key Pair
        </button>
        <button
          onClick={() => setRsaMode("encrypt")}
          className={`px-4 py-2 rounded-lg ${
            rsaMode === "encrypt"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Encrypt
        </button>
        <button
          onClick={() => setRsaMode("decrypt")}
          className={`px-4 py-2 rounded-lg ${
            rsaMode === "decrypt"
              ? "bg-primary text-primary-foreground"
              : "bg-secondary"
          }`}
        >
          Decrypt
        </button>
      </div>

      {rsaPublicKey && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Public Key (SPKI)
          </label>
          <textarea
            value={rsaPublicKey}
            readOnly
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-xs min-h-[60px]"
          />
        </div>
      )}

      {rsaPrivateKey && (
        <div>
          <label className="block text-sm font-medium mb-2">
            Private Key (PKCS8)
          </label>
          <textarea
            value={rsaPrivateKey}
            readOnly
            className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-xs min-h-[60px]"
          />
        </div>
      )}

      {rsaMode === "encrypt" ? (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">
              Plaintext (max ~190 bytes)
            </label>
            <textarea
              value={rsaPlaintext}
              onChange={(e) => setRsaPlaintext(e.target.value)}
              maxLength={190}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-sm min-h-[80px]"
              placeholder="Enter short text to encrypt..."
            />
          </div>
          {rsaCiphertext && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Ciphertext
              </label>
              <textarea
                value={rsaCiphertext}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-xs min-h-[80px] text-success"
              />
            </div>
          )}
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium mb-2">Ciphertext</label>
            <textarea
              value={rsaCiphertext}
              onChange={(e) => setRsaCiphertext(e.target.value)}
              className="w-full px-4 py-3 bg-secondary border border-border rounded-lg focus:ring-2 focus:ring-primary font-mono text-xs min-h-[80px]"
              placeholder="Paste ciphertext to decrypt..."
            />
          </div>
          {rsaPlaintext && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Decrypted Plaintext
              </label>
              <textarea
                value={rsaPlaintext}
                readOnly
                className="w-full px-4 py-3 bg-secondary/50 border border-border rounded-lg font-mono text-sm min-h-[80px] text-success"
              />
            </div>
          )}
        </>
      )}

      <button
        onClick={handleRsaOperation}
        disabled={
          (rsaMode === "encrypt" && (!rsaPlaintext || !rsaPublicKey)) ||
          (rsaMode === "decrypt" && (!rsaCiphertext || !rsaPrivateKey))
        }
        className="w-full py-3 bg-gradient-to-r from-primary to-accent text-primary-foreground font-bold rounded-lg disabled:opacity-50"
      >
        {rsaMode === "encrypt"
          ? "Encrypt with Public Key"
          : "Decrypt with Private Key"}
      </button>
    </div>
  );
}

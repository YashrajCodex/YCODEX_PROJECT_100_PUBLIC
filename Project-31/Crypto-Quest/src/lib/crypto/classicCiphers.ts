/**
 * Classic cipher implementations for educational challenges
 * These are intentionally simple and insecure - for learning only!
 */

export function caesarEncrypt(text: string, shift: number): string {
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const code = char.charCodeAt(0);
        const base = code >= 65 && code <= 90 ? 65 : 97;
        return String.fromCharCode(((code - base + shift) % 26) + base);
      }
      return char;
    })
    .join('');
}

export function caesarDecrypt(text: string, shift: number): string {
  return caesarEncrypt(text, 26 - shift);
}

export function vigenereEncrypt(text: string, key: string): string {
  const cleanKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleanKey) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 97;
      result += String.fromCharCode(((code - base + shift) % 26) + base);
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

export function vigenereDecrypt(text: string, key: string): string {
  const cleanKey = key.toLowerCase().replace(/[^a-z]/g, '');
  if (!cleanKey) return text;
  
  let result = '';
  let keyIndex = 0;
  
  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    if (char.match(/[a-z]/i)) {
      const code = char.charCodeAt(0);
      const base = code >= 65 && code <= 90 ? 65 : 97;
      const shift = cleanKey.charCodeAt(keyIndex % cleanKey.length) - 97;
      result += String.fromCharCode(((code - base - shift + 26) % 26) + base);
      keyIndex++;
    } else {
      result += char;
    }
  }
  
  return result;
}

export function substitutionEncrypt(text: string, key: string): string {
  const alphabet = 'abcdefghijklmnopqrstuvwxyz';
  const cleanKey = key.toLowerCase();
  
  return text
    .split('')
    .map(char => {
      if (char.match(/[a-z]/i)) {
        const isUpper = char === char.toUpperCase();
        const index = alphabet.indexOf(char.toLowerCase());
        const encrypted = cleanKey[index] || char;
        return isUpper ? encrypted.toUpperCase() : encrypted;
      }
      return char;
    })
    .join('');
}

export function frequencyAnalysis(text: string): Record<string, number> {
  const freq: Record<string, number> = {};
  const cleanText = text.toLowerCase().replace(/[^a-z]/g, '');
  
  for (const char of cleanText) {
    freq[char] = (freq[char] || 0) + 1;
  }
  
  return freq;
}

export function analyzeText(text: string): {
  length: number;
  letterCount: number;
  frequencies: Record<string, number>;
  topLetters: Array<{ letter: string; count: number; percentage: number }>;
} {
  const cleanText = text.toLowerCase().replace(/[^a-z]/g, '');
  const frequencies = frequencyAnalysis(text);
  
  const topLetters = Object.entries(frequencies)
    .map(([letter, count]) => ({
      letter,
      count,
      percentage: (count / cleanText.length) * 100,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
  
  return {
    length: text.length,
    letterCount: cleanText.length,
    frequencies,
    topLetters,
  };
}

/**
 * One-Time Pad encryption/decryption
 * Theoretically unbreakable when:
 * - Key is truly random
 * - Key is at least as long as the message
 * - Key is never reused
 * - Key is kept secret
 */
export function generateOtpKey(length: number): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let key = '';
  const randomValues = new Uint32Array(length);
  crypto.getRandomValues(randomValues);
  for (let i = 0; i < length; i++) {
    key += chars[randomValues[i] % 26];
  }
  return key;
}

export function otpEncrypt(plaintext: string, key: string): { ciphertext: string; error?: string } {
  const cleanText = plaintext.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (cleanKey.length < cleanText.length) {
    return { 
      ciphertext: '', 
      error: `Key must be at least ${cleanText.length} characters (got ${cleanKey.length})` 
    };
  }
  
  let result = '';
  for (let i = 0; i < cleanText.length; i++) {
    const plainChar = cleanText.charCodeAt(i) - 65;
    const keyChar = cleanKey.charCodeAt(i) - 65;
    const encryptedChar = (plainChar + keyChar) % 26;
    result += String.fromCharCode(encryptedChar + 65);
  }
  
  return { ciphertext: result };
}

export function otpDecrypt(ciphertext: string, key: string): { plaintext: string; error?: string } {
  const cleanText = ciphertext.toUpperCase().replace(/[^A-Z]/g, '');
  const cleanKey = key.toUpperCase().replace(/[^A-Z]/g, '');
  
  if (cleanKey.length < cleanText.length) {
    return { 
      plaintext: '', 
      error: `Key must be at least ${cleanText.length} characters (got ${cleanKey.length})` 
    };
  }
  
  let result = '';
  for (let i = 0; i < cleanText.length; i++) {
    const cipherChar = cleanText.charCodeAt(i) - 65;
    const keyChar = cleanKey.charCodeAt(i) - 65;
    const decryptedChar = (cipherChar - keyChar + 26) % 26;
    result += String.fromCharCode(decryptedChar + 65);
  }
  
  return { plaintext: result };
}
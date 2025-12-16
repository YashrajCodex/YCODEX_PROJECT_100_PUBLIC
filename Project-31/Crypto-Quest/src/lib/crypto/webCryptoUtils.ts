/**
 * WebCrypto API utilities for cryptographic operations
 * All operations use the browser's native crypto.subtle API for security
 */

export interface CryptoResult {
  success: boolean;
  data?: string;
  error?: string;
}

/**
 * AES-GCM Encryption/Decryption
 * SECURITY: Always use unique IVs, never reuse with the same key
 */
export async function aesGcmEncrypt(plaintext: string, password: string): Promise<CryptoResult> {
  try {
    const enc = new TextEncoder();
    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password.padEnd(32, '0').slice(0, 32)),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode('cryptoquest-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['encrypt']
    );

    const iv = crypto.getRandomValues(new Uint8Array(12));
    const encrypted = await crypto.subtle.encrypt(
      { name: 'AES-GCM', iv },
      key,
      enc.encode(plaintext)
    );

    const combined = new Uint8Array(iv.length + encrypted.byteLength);
    combined.set(iv);
    combined.set(new Uint8Array(encrypted), iv.length);

    return {
      success: true,
      data: btoa(String.fromCharCode(...combined)),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Encryption failed',
    };
  }
}

export async function aesGcmDecrypt(ciphertext: string, password: string): Promise<CryptoResult> {
  try {
    const enc = new TextEncoder();
    const dec = new TextDecoder();
    
    const combined = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    const iv = combined.slice(0, 12);
    const encrypted = combined.slice(12);

    const keyMaterial = await crypto.subtle.importKey(
      'raw',
      enc.encode(password.padEnd(32, '0').slice(0, 32)),
      'PBKDF2',
      false,
      ['deriveBits', 'deriveKey']
    );

    const key = await crypto.subtle.deriveKey(
      {
        name: 'PBKDF2',
        salt: enc.encode('cryptoquest-salt'),
        iterations: 100000,
        hash: 'SHA-256',
      },
      keyMaterial,
      { name: 'AES-GCM', length: 256 },
      false,
      ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv },
      key,
      encrypted
    );

    return {
      success: true,
      data: dec.decode(decrypted),
    };
  } catch (error) {
    return {
      success: false,
      error: 'Decryption failed - wrong password or corrupted data',
    };
  }
}

/**
 * Hashing functions
 */
export async function sha256Hash(message: string): Promise<CryptoResult> {
  try {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-256', enc.encode(message));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return {
      success: true,
      data: hashHex,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Hashing failed',
    };
  }
}

export async function sha512Hash(message: string): Promise<CryptoResult> {
  try {
    const enc = new TextEncoder();
    const hashBuffer = await crypto.subtle.digest('SHA-512', enc.encode(message));
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    
    return {
      success: true,
      data: hashHex,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Hashing failed',
    };
  }
}

/**
 * RSA-OAEP Key Generation and Operations
 * SECURITY: Use minimum 2048-bit keys in production
 */
export async function generateRsaKeyPair(): Promise<{ publicKey: string; privateKey: string } | null> {
  try {
    const keyPair = await crypto.subtle.generateKey(
      {
        name: 'RSA-OAEP',
        modulusLength: 2048,
        publicExponent: new Uint8Array([1, 0, 1]),
        hash: 'SHA-256',
      },
      true,
      ['encrypt', 'decrypt']
    );

    const publicKey = await crypto.subtle.exportKey('spki', keyPair.publicKey);
    const privateKey = await crypto.subtle.exportKey('pkcs8', keyPair.privateKey);

    return {
      publicKey: btoa(String.fromCharCode(...new Uint8Array(publicKey))),
      privateKey: btoa(String.fromCharCode(...new Uint8Array(privateKey))),
    };
  } catch (error) {
    console.error('RSA key generation failed:', error);
    return null;
  }
}

export async function rsaEncrypt(plaintext: string, publicKeyStr: string): Promise<CryptoResult> {
  try {
    const enc = new TextEncoder();
    const publicKeyData = Uint8Array.from(atob(publicKeyStr), c => c.charCodeAt(0));
    
    const publicKey = await crypto.subtle.importKey(
      'spki',
      publicKeyData,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['encrypt']
    );

    const encrypted = await crypto.subtle.encrypt(
      { name: 'RSA-OAEP' },
      publicKey,
      enc.encode(plaintext)
    );

    return {
      success: true,
      data: btoa(String.fromCharCode(...new Uint8Array(encrypted))),
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'RSA encryption failed',
    };
  }
}

export async function rsaDecrypt(ciphertext: string, privateKeyStr: string): Promise<CryptoResult> {
  try {
    const dec = new TextDecoder();
    const privateKeyData = Uint8Array.from(atob(privateKeyStr), c => c.charCodeAt(0));
    const encryptedData = Uint8Array.from(atob(ciphertext), c => c.charCodeAt(0));
    
    const privateKey = await crypto.subtle.importKey(
      'pkcs8',
      privateKeyData,
      {
        name: 'RSA-OAEP',
        hash: 'SHA-256',
      },
      false,
      ['decrypt']
    );

    const decrypted = await crypto.subtle.decrypt(
      { name: 'RSA-OAEP' },
      privateKey,
      encryptedData
    );

    return {
      success: true,
      data: dec.decode(decrypted),
    };
  } catch (error) {
    return {
      success: false,
      error: 'RSA decryption failed',
    };
  }
}

/**
 * HMAC operations
 * SECURITY: Use HMAC for message authentication, not plain hashes
 */
export async function hmacSign(message: string, secretKey: string): Promise<CryptoResult> {
  try {
    const enc = new TextEncoder();
    const key = await crypto.subtle.importKey(
      'raw',
      enc.encode(secretKey),
      { name: 'HMAC', hash: 'SHA-256' },
      false,
      ['sign']
    );

    const signature = await crypto.subtle.sign('HMAC', key, enc.encode(message));
    const signatureArray = Array.from(new Uint8Array(signature));
    const signatureHex = signatureArray.map(b => b.toString(16).padStart(2, '0')).join('');

    return {
      success: true,
      data: signatureHex,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'HMAC signing failed',
    };
  }
}

export async function hmacVerify(message: string, signature: string, secretKey: string): Promise<boolean> {
  try {
    const computed = await hmacSign(message, secretKey);
    return computed.success && computed.data === signature;
  } catch {
    return false;
  }
}
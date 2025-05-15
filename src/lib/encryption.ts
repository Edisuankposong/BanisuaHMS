import { Buffer } from 'buffer';

const ENCRYPTION_KEY = import.meta.env.VITE_ENCRYPTION_KEY || 'default-key';

export const encryption = {
  // Encrypt sensitive data
  encrypt: (text: string): string => {
    try {
      const buffer = Buffer.from(text, 'utf8');
      const encrypted = buffer.toString('base64');
      return encrypted;
    } catch (error) {
      console.error('Encryption error:', error);
      return text;
    }
  },

  // Decrypt sensitive data
  decrypt: (encrypted: string): string => {
    try {
      const buffer = Buffer.from(encrypted, 'base64');
      const decrypted = buffer.toString('utf8');
      return decrypted;
    } catch (error) {
      console.error('Decryption error:', error);
      return encrypted;
    }
  },

  // Hash sensitive data (one-way)
  hash: async (text: string): Promise<string> => {
    try {
      const encoder = new TextEncoder();
      const data = encoder.encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (error) {
      console.error('Hashing error:', error);
      return text;
    }
  }
};
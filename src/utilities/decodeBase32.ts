/* eslint-disable no-bitwise */

export default function decodeBase32(input: string): Buffer | undefined {
  const inputWithoutPadding = input.replace(/[=]/g, '');
  const originalSize = Math.floor((inputWithoutPadding.length * 5) / 8);
  const buffer = new Uint8Array(originalSize);

  let bits = 0;
  let value = 0;
  let index = 0;
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  for (const char of inputWithoutPadding) {
    const charIndex = alphabet.indexOf(char.toUpperCase());

    if (charIndex === -1) {
      return undefined;
    }

    value = (value << 5) | charIndex;
    bits += 5;

    if (bits >= 8) {
      buffer[index++] = (value >> (bits - 8)) & 255;
      bits -= 8;
    }
  }

  return Buffer.from(buffer.buffer);
}

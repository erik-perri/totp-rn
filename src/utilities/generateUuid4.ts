/* eslint-disable no-bitwise */

import {randomBytes} from 'crypto';

export default function generateUuid4(): Uint8Array {
  const bytes = randomBytes(16);

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;

  return bytes;
}

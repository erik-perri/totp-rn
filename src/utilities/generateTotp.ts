/* eslint-disable no-bitwise */
import crypto from 'crypto';

import TotpAlgorithm from '../enums/TotpAlgorithm';
import decodeBase32 from './decodeBase32';

export default function generateTotp(
  secret: string,
  algorithm: TotpAlgorithm,
  timeStepInSeconds: number,
  codeSizeInDigits: number,
  initialTimeInSeconds: number,
  currentTimeInSeconds: number,
): string {
  const key = decodeBase32(secret);
  if (!key) {
    throw new Error('Invalid secret');
  }

  const time = Math.floor(
    (currentTimeInSeconds - initialTimeInSeconds) / timeStepInSeconds,
  );
  const timeBytes = Buffer.allocUnsafe(8);
  timeBytes.writeBigInt64BE(BigInt(time));

  const hmac = crypto.createHmac(algorithm, key);
  hmac.update(timeBytes);
  const hash = hmac.digest();

  const offset = hash[hash.length - 1] & 0xf;
  const binary =
    ((hash[offset] & 0x7f) << 24) |
    ((hash[offset + 1] & 0xff) << 16) |
    ((hash[offset + 2] & 0xff) << 8) |
    (hash[offset + 3] & 0xff);

  const modulo = Math.pow(10, codeSizeInDigits);
  const otp = binary % modulo;

  return otp.toString().padStart(codeSizeInDigits, '0');
}

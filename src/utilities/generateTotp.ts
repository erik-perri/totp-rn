/* eslint-disable no-bitwise */
import crypto from 'crypto';

export default function generateTotp(
  secret: string,
  algorithm: string,
  timeStep: number,
  codeSize: number,
  initialTime: number,
  currentTime: number,
): string {
  const key = Buffer.from(secret, 'utf8');
  const time = Math.floor((currentTime - initialTime) / timeStep);
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

  const modulo = Math.pow(10, codeSize);
  const otp = binary % modulo;

  return otp.toString().padStart(codeSize, '0');
}

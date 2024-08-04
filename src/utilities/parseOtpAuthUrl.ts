import {URL} from 'react-native-url-polyfill';

import TotpAlgorithm from '../enums/TotpAlgorithm';
import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import decodeBase32 from './decodeBase32';

/**
 * @see https://github.com/google/google-authenticator/wiki/Key-Uri-Format
 */
export default function parseOtpAuthUrl(
  input: string,
): AuthenticatorWithoutId | undefined {
  const url = new URL(input);

  if (url.protocol !== 'otpauth:') {
    return undefined;
  }

  if (url.hostname !== 'totp') {
    // TODO Support HOTP?
    return undefined;
  }

  const secret = url.searchParams.get('secret');
  if (!secret || !decodeBase32(secret)) {
    console.warn('Invalid secret found.');
    return undefined;
  }

  const algorithmInput = url.searchParams.get('algorithm')?.toLowerCase();
  if (algorithmInput && !isTotpAlgorithm(algorithmInput)) {
    console.warn('Unknown algorithm:', algorithmInput);
    return undefined;
  }

  const codeSize = parseInt(url.searchParams.get('digits') ?? '6', 10);
  if (isNaN(codeSize)) {
    console.warn('Invalid code size:', codeSize);
    return undefined;
  }

  const timeStep = parseInt(url.searchParams.get('period') ?? '30', 10);
  if (isNaN(timeStep)) {
    console.warn('Invalid time step:', timeStep);
    return undefined;
  }

  const [issuer, label] = url.pathname.includes(':')
    ? url.pathname.split(':')
    : url.pathname.split('/');

  const explicitIssuer = url.searchParams.get('issuer');

  return {
    algorithm:
      algorithmInput && isTotpAlgorithm(algorithmInput)
        ? algorithmInput
        : TotpAlgorithm.Sha1,
    issuer: explicitIssuer ?? issuer,
    username: label,
    secret,
    initialTime: 0,
    timeStep,
    codeSize,
  };
}

function isTotpAlgorithm(input: string): input is TotpAlgorithm {
  return Object.values(TotpAlgorithm).includes(input as TotpAlgorithm);
}

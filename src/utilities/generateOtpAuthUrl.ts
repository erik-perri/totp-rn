import {URL} from 'react-native-url-polyfill';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';

export default function generateOtpAuthUrl(
  authenticator: AuthenticatorWithoutId,
): string {
  const url = new URL('otpauth://totp');

  if (authenticator.username !== undefined) {
    url.pathname = `${authenticator.issuer}:${authenticator.username}`;
  } else {
    url.pathname = authenticator.issuer;
  }

  url.searchParams.set('issuer', authenticator.issuer);
  url.searchParams.set('secret', authenticator.secret);
  url.searchParams.set('algorithm', authenticator.algorithm);
  url.searchParams.set('digits', authenticator.codeSize.toString());
  url.searchParams.set('period', authenticator.timeStep.toString());

  return url.toString();
}

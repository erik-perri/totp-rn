import {Code} from 'react-native-vision-camera';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import parseOtpAuthUrl from './parseOtpAuthUrl';

export default function findAuthenticatorInCodes(
  codes: Code[],
): AuthenticatorWithoutId[] {
  const authenticators = codes.map(
    (code): AuthenticatorWithoutId | undefined => {
      if (!code.value) {
        return undefined;
      }

      return parseOtpAuthUrl(code.value);
    },
  );

  return authenticators.filter(
    (authenticator): authenticator is AuthenticatorWithoutId =>
      authenticator !== undefined,
  );
}

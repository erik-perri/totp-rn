import {randomBytes} from 'crypto';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import stringifyUuid from './stringifyUuid';

export default function generateAuthenticatorId(
  _: AuthenticatorWithoutId,
): string {
  const bytes = randomBytes(16);

  return stringifyUuid(bytes);
}

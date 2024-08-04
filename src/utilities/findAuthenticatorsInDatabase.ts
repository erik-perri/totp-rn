import {Database, Group} from 'kdbx-ts';

import {Authenticator} from '../parsers/authenticatorParser';
import parseOtpAuthUrl from './parseOtpAuthUrl';

export default function findAuthenticatorsInDatabase(
  database: Database,
): Authenticator[] {
  return findAuthenticatorsInGroup(database.root.group);
}

function findAuthenticatorsInGroup(group: Group): Authenticator[] {
  const authenticatorsInGroup: Authenticator[] = [];

  if (group.entries) {
    for (const entry of group.entries) {
      const otpUrl = entry.attributes?.otp;

      if (!otpUrl) {
        continue;
      }

      const authenticator = parseOtpAuthUrl(otpUrl.value);

      if (!authenticator) {
        continue;
      }

      authenticatorsInGroup.push({
        ...authenticator,
        id: entry.uuid,
      });
    }
  }

  // if (group.children) {
  //   for (const child of group.children) {
  //     authenticatorsInGroup.push(...findAuthenticatorsInGroup(child));
  //   }
  // }

  return authenticatorsInGroup;
}

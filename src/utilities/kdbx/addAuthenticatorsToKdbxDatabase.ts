import {Database, Entry} from 'kdbx-ts';

import {AuthenticatorWithoutId} from '../../parsers/authenticatorParser';
import generateOtpAuthUrl from '../generateOtpAuthUrl';
import generateUuid4 from '../generateUuid4';
import stringifyUuid from '../stringifyUuid';

export default function addAuthenticatorsToKdbxDatabase(
  database: Database,
  authenticators: AuthenticatorWithoutId[],
): Database {
  if (!database.root.group.entries) {
    database.root.group.entries = [];
  }

  // TODO Don't mutate the database object
  database.root.group.entries.push(
    ...authenticators.map(
      authenticator =>
        ({
          uuid: stringifyUuid(generateUuid4()),
          attributes: {
            Title: {
              key: 'Title',
              isProtected: false,
              value: authenticator.issuer,
            },
            UserName: {
              key: 'UserName',
              isProtected: false,
              value: authenticator.username ?? '',
            },
            otp: {
              key: 'otp',
              isProtected: false,
              value: generateOtpAuthUrl(authenticator),
            },
          },
          timeInfo: {
            creationTime: new Date(),
            lastModificationTime: new Date(),
          },
        } satisfies Entry),
    ),
  );

  return database;
}

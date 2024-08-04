import {Database} from 'kdbx-ts';

import {Authenticator} from '../../parsers/authenticatorParser';

export default function removeAuthenticatorFromKdbxDatabase(
  database: Database,
  authenticator: Authenticator,
): Database {
  if (!database.root.group.entries) {
    throw new Error(
      'Cannot remove authenticator, no entries found in database.',
    );
  }

  const entryIndex = database.root.group.entries.findIndex(
    entry => entry.uuid.toString() === authenticator.id,
  );

  if (entryIndex === -1) {
    throw new Error('Authenticator not found in database');
  }

  // TODO Don't mutate the database object
  // TODO Create/use recycle bin group for deleted entries, then search it when
  //      re-adding and show a trash icon
  database.root.group.entries.splice(entryIndex, 1);

  return database;
}

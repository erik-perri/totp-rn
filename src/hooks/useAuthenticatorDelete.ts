import {useCallback} from 'react';

import {Authenticator} from '../parsers/authenticatorParser';
import useSecureSettingsStore from '../stores/useSecureSettingsStore';
import removeAuthenticatorFromKdbxDatabase from '../utilities/kdbx/removeAuthenticatorFromKdbxDatabase';
import useDatabaseFileUpdater from './useDatabaseFileUpdater';

export default function useAuthenticatorDelete() {
  const updateDatabaseFile = useDatabaseFileUpdater();
  const kdbxFile = useSecureSettingsStore(state => state.kdbxFile);

  return useCallback(
    async (authenticator: Authenticator) => {
      if (!kdbxFile) {
        throw new Error('Database not loaded.');
      }

      const updatedFile = {
        ...kdbxFile,
        database: removeAuthenticatorFromKdbxDatabase(
          kdbxFile.database,
          authenticator,
        ),
      };

      await updateDatabaseFile(updatedFile);
    },
    [kdbxFile, updateDatabaseFile],
  );
}

import {useCallback} from 'react';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import useSecureSettingsStore from '../stores/useSecureSettingsStore';
import addAuthenticatorsToKdbxDatabase from '../utilities/kdbx/addAuthenticatorsToKdbxDatabase';
import useDatabaseFileUpdater from './useDatabaseFileUpdater';

export default function useAuthenticatorCreate() {
  const updateDatabaseFile = useDatabaseFileUpdater();
  const kdbxFile = useSecureSettingsStore(state => state.kdbxFile);

  return useCallback(
    async (authenticators: AuthenticatorWithoutId[]) => {
      if (!kdbxFile) {
        throw new Error('Database not loaded.');
      }

      const updatedFile = {
        ...kdbxFile,
        database: addAuthenticatorsToKdbxDatabase(
          kdbxFile.database,
          authenticators,
        ),
      };

      await updateDatabaseFile(updatedFile);
    },
    [kdbxFile, updateDatabaseFile],
  );
}

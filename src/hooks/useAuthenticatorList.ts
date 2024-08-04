import {useMemo} from 'react';

import {Authenticator} from '../parsers/authenticatorParser';
import useSecureSettingsStore from '../stores/useSecureSettingsStore';
import findAuthenticatorsInDatabase from '../utilities/findAuthenticatorsInDatabase';

export default function useAuthenticatorList(): Authenticator[] {
  const kdbxFile = useSecureSettingsStore(state => state.kdbxFile);

  return useMemo(() => {
    if (!kdbxFile) {
      return [];
    }

    return findAuthenticatorsInDatabase(kdbxFile.database);
  }, [kdbxFile]);
}

import {KdbxFile} from 'kdbx-ts';
import {useCallback} from 'react';

import {SecureSettings} from '../parsers/secureSettingsParser';
import useSecureSettingsStore from '../stores/useSecureSettingsStore';
import saveKdbxDatabase from '../utilities/kdbx/saveKdbxDatabase';
import storeSecureSettings from '../utilities/storeSecureSettings';
import usePublicSettings from './usePublicSettings';

export default function useDatabaseFileUpdater() {
  const settings = usePublicSettings();

  const secureSettings = useSecureSettingsStore(state => state.secureSettings);
  const unlock = useSecureSettingsStore(state => state.unlock);

  return useCallback(
    async (updatedFile: KdbxFile) => {
      if (!secureSettings) {
        throw new Error('Not unlocked.');
      }

      const result = await saveKdbxDatabase(
        settings.storage.file,
        secureSettings.masterPassword,
        updatedFile,
      );

      const updatedSecureSettings: SecureSettings = {
        compositeKey: Array.from(result.compositeKey),
        masterPassword: secureSettings.masterPassword,
        settingsVersion: secureSettings.settingsVersion,
      };

      if (settings.biometricsEnabled) {
        await storeSecureSettings(updatedSecureSettings);
      }

      unlock(updatedFile, updatedSecureSettings);
    },
    [secureSettings, settings, unlock],
  );
}

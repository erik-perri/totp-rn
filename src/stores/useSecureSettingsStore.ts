import {KdbxFile} from 'kdbx-ts';
import {create} from 'zustand';

import {SecureSettings} from '../parsers/secureSettingsParser';

type SecureSettingsStore = {
  kdbxFile?: KdbxFile;
  secureSettings?: SecureSettings;

  lock: () => void;
  unlock: (kdbxFile: KdbxFile, secureSettings: SecureSettings) => void;
};

/**
 * Contains the secure settings and unlocked KDBX file data.
 */
const useSecureSettingsStore = create<SecureSettingsStore>(set => ({
  kdbxFile: undefined,
  secureSettings: undefined,

  lock: () => {
    set({kdbxFile: undefined, secureSettings: undefined});
  },
  unlock: (kdbxFile, secureSettings) => {
    set({kdbxFile, secureSettings});
  },
}));

export default useSecureSettingsStore;

import {KdbxFile} from 'kdbx-ts';
import {create} from 'zustand';

import {SecureSettings} from '../parsers/secureSettingsParser';

type SecureSettingsStore = {
  kdbxFile?: KdbxFile;
  secureSettings?: SecureSettings;
};

/**
 * Contains the secure settings and unlocked KDBX file data.
 */
const useSecureSettingsStore = create<SecureSettingsStore>(() => ({
  kdbxFile: undefined,
  secureSettings: undefined,
}));

export default useSecureSettingsStore;

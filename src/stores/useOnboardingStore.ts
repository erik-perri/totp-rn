import {create} from 'zustand';

import {NativeFile} from '../modules/filesystemModule';
import {StorageSettings} from '../parsers/storageSettingsParser';

type OnboardingStore = {
  compositeKey?: Uint8Array;
  masterPassword?: string;
  newDatabase?: Uint8Array;
  storage?: Partial<StorageSettings>;

  clearDetails: () => void;
  createDatabase: (
    newDatabase: Uint8Array,
    compositeKey: Uint8Array,
    masterPassword: string,
  ) => void;
  openDatabase: (
    storageFile: NativeFile,
    compositeKey: Uint8Array,
    masterPassword: string,
  ) => void;
  storeFile: (location: StorageSettings['location'], file: NativeFile) => void;
};

/**
 * Contains the details entered during the onboarding process. Once the
 * biometric choice has been made, the details will be saved and this will be
 * cleared.
 */
const useOnboardingStore = create<OnboardingStore>(set => ({
  compositeKey: undefined,
  masterPassword: undefined,
  newDatabase: undefined,
  storage: undefined,

  clearDetails: () => {
    set({
      compositeKey: undefined,
      masterPassword: undefined,
      newDatabase: undefined,
      storage: undefined,
    });
  },
  createDatabase: (newDatabase, compositeKey, masterPassword) => {
    set({compositeKey, masterPassword, newDatabase, storage: undefined});
  },
  openDatabase: (storageFile, compositeKey, masterPassword) => {
    set({
      compositeKey,
      masterPassword,
      newDatabase: undefined,
      storage: {
        file: storageFile,
        location: 'external',
      },
    });
  },
  storeFile: (location, file) => {
    set({
      storage: {
        file,
        location,
      },
    });
  },
}));

export default useOnboardingStore;

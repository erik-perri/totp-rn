import {create} from 'zustand';

import {StorageSettings} from '../parsers/storageSettingsParser';

type OnboardingStore = {
  compositeKey?: Uint8Array;
  masterPassword?: string;
  newDatabase?: Uint8Array;
  storage?: Partial<StorageSettings>;
};

/**
 * Contains the details entered during the onboarding process. Once the
 * biometric choice has been made, the details will be saved and this will be
 * cleared.
 */
const useOnboardingStore = create<OnboardingStore>()(() => ({
  compositeKey: undefined,
  masterPassword: undefined,
  newDatabase: undefined,
  storage: undefined,
}));

export default useOnboardingStore;

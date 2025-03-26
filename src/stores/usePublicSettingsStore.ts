import {create} from 'zustand';

import {PublicSettings} from '../parsers/publicSettingsParser';

type PublicSettingsStore = {
  error?: unknown;
  initialized: boolean;
  settings?: PublicSettings;
};

/**
 * Contains the public settings, stored in AsyncStorage. Loaded immediately on
 * application start.
 */
const usePublicSettingsStore = create<PublicSettingsStore>()(() => ({
  error: undefined,
  initialized: false,
  settings: undefined,
}));

export default usePublicSettingsStore;

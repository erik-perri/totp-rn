import {create} from 'zustand';

import {PublicSettings} from '../parsers/publicSettingsParser';
import retrievePublicSettings from '../utilities/retrievePublicSettings';
import storePublicSettings from '../utilities/storePublicSettings';

type PublicSettingsStore = {
  error?: unknown;
  initialized: boolean;
  settings?: PublicSettings;

  load: () => Promise<void>;
  save: (settings: PublicSettings) => Promise<void>;
};

/**
 * Contains the public settings, stored in AsyncStorage. Loaded immediately on
 * application start.
 */
const usePublicSettingsStore = create<PublicSettingsStore>(set => ({
  error: undefined,
  initialized: false,
  settings: undefined,

  load: async () => {
    try {
      const settings = await retrievePublicSettings();

      set({
        error: undefined,
        initialized: true,
        settings,
      });
    } catch (error) {
      set({
        error,
        initialized: true,
        settings: undefined,
      });
    }
  },

  save: async settings => {
    try {
      await storePublicSettings(settings);

      set({
        error: undefined,
        initialized: true,
        settings,
      });
    } catch (error) {
      set({
        error,
        initialized: true,
        settings: undefined,
      });
    }
  },
}));

export default usePublicSettingsStore;

import {boolean, number, object, output} from 'zod';

import {storageSettingsParser} from './storageSettingsParser';

export const publicSettingsParser = object({
  biometricsEnabled: boolean(),
  settingsVersion: number(),
  storage: storageSettingsParser,
});

export type PublicSettings = output<typeof publicSettingsParser>;

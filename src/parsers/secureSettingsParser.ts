import {array, number, object, output, string} from 'zod';

export const secureSettingsParser = object({
  compositeKey: array(number()),
  masterPassword: string(),
  settingsVersion: number(),
});

export type SecureSettings = output<typeof secureSettingsParser>;

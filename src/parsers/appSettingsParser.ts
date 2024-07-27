import {
  boolean,
  discriminatedUnion,
  literal,
  number,
  object,
  optional,
  output,
  string,
} from 'zod';

export const storageSettingsParser = discriminatedUnion('storageLocation', [
  object({
    storageLocation: literal('internal'),
  }),
  object({
    storageLocation: literal('external'),
    externalPath: string(),
    externalLabel: optional(string()),
  }),
]);

export const appSettingsParser = object({
  biometricsEnabled: boolean(),
  storage: storageSettingsParser,
  version: number(),
});

export type AppSettings = output<typeof appSettingsParser>;

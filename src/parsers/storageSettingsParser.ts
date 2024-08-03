import {literal, nullable, object, output, string, union} from 'zod';

const nativeFileParser = object({
  name: nullable(string()),
  uri: string(),
});

export const storageSettingsParser = object({
  location: union([literal('external'), literal('internal')]),
  file: nativeFileParser,
});

export type StorageSettings = output<typeof storageSettingsParser>;

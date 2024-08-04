import {StorageSettings} from '../parsers/storageSettingsParser';

export default function isStorageSettingsValid(
  settings: Partial<StorageSettings> | undefined,
): settings is StorageSettings {
  return settings?.location !== undefined && settings.file !== undefined;
}

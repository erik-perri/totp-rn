import {PublicSettings} from '../parsers/publicSettingsParser';
import usePublicSettingsStore from '../stores/usePublicSettingsStore';

export default function usePublicSettings(): PublicSettings {
  const settings = usePublicSettingsStore(state => state.settings);

  if (!settings) {
    throw new Error('Settings not loaded.');
  }

  return settings;
}

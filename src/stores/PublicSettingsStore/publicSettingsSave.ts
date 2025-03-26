import {PublicSettings} from '../../parsers/publicSettingsParser';
import storePublicSettings from '../../utilities/storePublicSettings';
import usePublicSettingsStore from '../usePublicSettingsStore';

export default async function publicSettingsSave(
  settings: PublicSettings,
): Promise<void> {
  try {
    await storePublicSettings(settings);

    usePublicSettingsStore.setState({
      error: undefined,
      initialized: true,
      settings,
    });
  } catch (error) {
    usePublicSettingsStore.setState({
      error,
      initialized: true,
      settings: undefined,
    });
  }
}

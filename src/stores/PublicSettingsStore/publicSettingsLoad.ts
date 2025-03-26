import retrievePublicSettings from '../../utilities/retrievePublicSettings';
import usePublicSettingsStore from '../usePublicSettingsStore';

export default async function publicSettingsLoad(): Promise<void> {
  try {
    const settings = await retrievePublicSettings();

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

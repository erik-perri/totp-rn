import {NativeFile} from '../../modules/filesystemModule';
import {StorageSettings} from '../../parsers/storageSettingsParser';
import useOnboardingStore from '../useOnboardingStore';

export default function onboardingSetFile(
  location: StorageSettings['location'],
  file: NativeFile,
) {
  useOnboardingStore.setState({
    storage: {
      file,
      location,
    },
  });
}

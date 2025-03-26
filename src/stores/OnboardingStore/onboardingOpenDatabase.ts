import {NativeFile} from '../../modules/filesystemModule';
import useOnboardingStore from '../useOnboardingStore';

export default function onboardingOpenDatabase(
  storageFile: NativeFile,
  compositeKey: Uint8Array,
  masterPassword: string,
) {
  useOnboardingStore.setState({
    compositeKey,
    masterPassword,
    newDatabase: undefined,
    storage: {
      file: storageFile,
      location: 'external',
    },
  });
}

import useOnboardingStore from '../useOnboardingStore';

export default function onboardingCreateDatabase(
  newDatabase: Uint8Array,
  compositeKey: Uint8Array,
  masterPassword: string,
) {
  useOnboardingStore.setState({
    compositeKey,
    masterPassword,
    newDatabase,
    storage: undefined,
  });
}

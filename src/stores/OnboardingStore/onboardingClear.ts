import useOnboardingStore from '../useOnboardingStore';

export default function onboardingClear() {
  useOnboardingStore.setState({
    compositeKey: undefined,
    masterPassword: undefined,
    newDatabase: undefined,
    storage: undefined,
  });
}

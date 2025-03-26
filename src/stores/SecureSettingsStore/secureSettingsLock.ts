import useSecureSettingsStore from '../useSecureSettingsStore';

export default function secureSettingsLock(): void {
  useSecureSettingsStore.setState({
    kdbxFile: undefined,
    secureSettings: undefined,
  });
}

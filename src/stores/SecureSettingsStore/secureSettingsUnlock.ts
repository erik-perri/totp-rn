import {KdbxFile} from 'kdbx-ts';

import {SecureSettings} from '../../parsers/secureSettingsParser';
import useSecureSettingsStore from '../useSecureSettingsStore';

export default function secureSettingsUnlock(
  kdbxFile: KdbxFile,
  secureSettings: SecureSettings,
): void {
  useSecureSettingsStore.setState({
    kdbxFile,
    secureSettings,
  });
}

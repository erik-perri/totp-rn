import * as Keychain from 'react-native-keychain';

import {
  SecureSettings,
  secureSettingsParser,
} from '../parsers/secureSettingsParser';

export default async function storeSecureSettings(
  settings: SecureSettings,
): Promise<void> {
  const result = secureSettingsParser.safeParse(settings);

  if (!result.success) {
    console.error(
      'Secure settings validation error',
      JSON.stringify(result.error.errors, null, 2),
    );

    throw new Error(
      'Unable to store secure settings due to structure mismatch.',
    );
  }

  await Keychain.setGenericPassword('data', JSON.stringify(settings), {
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    service: 'dev.perri.totp-rn.data',
  });
}

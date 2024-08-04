import Keychain from 'react-native-keychain';

import {
  SecureSettings,
  secureSettingsParser,
} from '../parsers/secureSettingsParser';

export default async function retrieveSecureSettings(): Promise<SecureSettings> {
  const storedData = await Keychain.getGenericPassword({
    accessControl: Keychain.ACCESS_CONTROL.BIOMETRY_ANY,
    accessible: Keychain.ACCESSIBLE.WHEN_UNLOCKED,
    service: 'dev.perri.totp-rn.data',
  });

  if (!storedData) {
    throw new Error('No biometric data stored.');
  }

  if (storedData.username !== 'data') {
    throw new Error('Stored data is not the expected data.');
  }

  const result = secureSettingsParser.safeParse(
    JSON.parse(storedData.password),
  );

  if (!result.success) {
    console.error(
      'Secure settings validation error',
      JSON.stringify(result.error.errors, null, 2),
    );

    throw new Error(
      'Unable to load secure settings due to structure mismatch.',
    );
  }

  return result.data;
}

import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PublicSettings,
  publicSettingsParser,
} from '../parsers/publicSettingsParser';

export default async function storePublicSettings(
  settings: PublicSettings,
): Promise<void> {
  const result = publicSettingsParser.safeParse(settings);

  if (!result.success) {
    console.error(
      'Public settings validation error',
      JSON.stringify(result.error.errors, null, 2),
    );

    throw new Error(
      'Unable to store public settings due to structure mismatch.',
    );
  }

  await AsyncStorage.setItem('settings', JSON.stringify(settings));
}

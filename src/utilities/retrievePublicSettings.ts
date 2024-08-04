import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  PublicSettings,
  publicSettingsParser,
} from '../parsers/publicSettingsParser';

export default async function retrievePublicSettings(): Promise<
  PublicSettings | undefined
> {
  const serialized = await AsyncStorage.getItem('settings');

  if (serialized === null) {
    return undefined;
  }

  const result = publicSettingsParser.safeParse(JSON.parse(serialized));

  if (!result.success) {
    console.error(
      'Public settings validation error',
      JSON.stringify(result.error.errors, null, 2),
    );

    throw new Error(
      'Unable to load public settings due to structure mismatch.',
    );
  }

  return result.data;
}

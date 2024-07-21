import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, useQuery} from '@tanstack/react-query';

import {AppSettings, appSettingsParser} from '../parsers/appSettingsParser';

const settingsQueryKey = ['settings'] as const;

export function updateSettingsData(
  queryClient: QueryClient,
  newData: AppSettings,
) {
  queryClient.setQueryData(settingsQueryKey, newData);
}

export default function useAppSettingsQuery() {
  return useQuery({
    queryKey: settingsQueryKey,
    queryFn: async (): Promise<AppSettings | null> => {
      const serialized = await AsyncStorage.getItem('settings');

      if (serialized === null) {
        return null;
      }

      const deserialized: unknown = JSON.parse(serialized);

      return appSettingsParser.parse(deserialized);
    },
  });
}

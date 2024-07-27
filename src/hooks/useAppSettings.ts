import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';

import {AppSettings, appSettingsParser} from '../parsers/appSettingsParser';

const settingsQueryKey = ['settings'] as const;

function updateSettingsData(queryClient: QueryClient, newData: AppSettings) {
  queryClient.setQueryData(settingsQueryKey, newData);
}

function useAppSettingsQuery() {
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

function useAuthenticatorUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (settings: AppSettings) => {
      await AsyncStorage.setItem('settings', JSON.stringify(settings));

      return settings;
    },
    onSuccess(newData) {
      updateSettingsData(queryClient, newData);
    },
  });
}

export default function useAppSettings() {
  const query = useAppSettingsQuery();
  const mutation = useAuthenticatorUpdateMutation();

  return {
    settings: query.data,
    settingsError: query.error,
    settingsLoading: query.isLoading,
    updateSettings: mutation.mutateAsync,
  };
}

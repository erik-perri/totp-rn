import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {useMemo} from 'react';

import {
  PublicSettings,
  publicSettingsParser,
} from '../parsers/publicSettingsParser';

const publicSettingsQueryKey = ['publicSettings'] as const;
const publicSettingsStorageKey = 'settings';

function updatePublicSettingsData(
  queryClient: QueryClient,
  newData: PublicSettings,
) {
  queryClient.setQueryData(publicSettingsQueryKey, newData);
}

function usePublicSettingsQuery() {
  return useQuery({
    queryKey: publicSettingsQueryKey,
    async queryFn(): Promise<PublicSettings | null> {
      const serialized = await AsyncStorage.getItem(publicSettingsStorageKey);

      if (serialized === null) {
        return null;
      }

      const deserialized: unknown = JSON.parse(serialized);

      return publicSettingsParser.parse(deserialized);
    },
  });
}

function usePublicSettingsUpdateMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    async mutationFn(settings: PublicSettings) {
      await AsyncStorage.setItem(
        publicSettingsStorageKey,
        JSON.stringify(settings),
      );

      return settings;
    },
    onSuccess(newData) {
      updatePublicSettingsData(queryClient, newData);
    },
  });
}

export default function usePublicSettings() {
  const query = usePublicSettingsQuery();
  const mutation = usePublicSettingsUpdateMutation();

  return useMemo(
    () => ({
      settings: query.data,
      settingsError: query.error,
      settingsLoading: query.isLoading,
      updateSettings: mutation.mutateAsync,
    }),
    [query, mutation],
  );
}

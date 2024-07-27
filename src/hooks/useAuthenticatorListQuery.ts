import AsyncStorage from '@react-native-async-storage/async-storage';
import {QueryClient, useQuery} from '@tanstack/react-query';
import {array} from 'zod';

import {
  Authenticator,
  authenticatorParser,
} from '../parsers/authenticatorParser';

const authenticatorListQueryKey = ['authenticators'] as const;

export function updateAuthenticatorListData(
  queryClient: QueryClient,
  newData: Authenticator[],
) {
  queryClient.setQueryData(authenticatorListQueryKey, newData);
}

export default function useAuthenticatorListQuery() {
  return useQuery({
    queryKey: authenticatorListQueryKey,
    async queryFn(): Promise<Authenticator[]> {
      const serialized = await AsyncStorage.getItem('authenticators');

      if (serialized === null) {
        return [];
      }

      const deserialized: unknown = JSON.parse(serialized);

      return array(authenticatorParser).parse(deserialized);
    },
  });
}

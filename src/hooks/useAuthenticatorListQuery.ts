import AsyncStorage from '@react-native-async-storage/async-storage';
import {useQuery} from '@tanstack/react-query';
import {array} from 'zod';

import {
  Authenticator,
  authenticatorParser,
} from '../parsers/authenticatorParser';

export default function useAuthenticatorListQuery() {
  return useQuery({
    queryKey: ['authenticators'],
    queryFn: async (): Promise<Authenticator[]> => {
      const serialized = await AsyncStorage.getItem('authenticators');

      if (serialized === null) {
        return [];
      }

      const deserialized: unknown = JSON.parse(serialized);

      return array(authenticatorParser).parse(deserialized);
    },
  });
}

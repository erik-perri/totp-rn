import {useQuery} from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Authenticator,
  authenticatorParser,
} from '../parsers/authenticatorParser';
import {array} from 'zod';

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

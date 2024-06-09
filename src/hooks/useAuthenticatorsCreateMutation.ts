import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  Authenticator,
  AuthenticatorWithoutId,
} from '../parsers/authenticatorParser';
import generateAuthenticatorId from '../utilities/generateAuthenticatorId';
import useAuthenticatorListQuery, {
  updateAuthenticatorListData,
} from './useAuthenticatorListQuery';

export default function useAuthenticatorsCreateMutation() {
  const queryClient = useQueryClient();
  const {data} = useAuthenticatorListQuery();

  return useMutation({
    mutationFn: async (newAuthenticators: AuthenticatorWithoutId[]) => {
      const newData: Authenticator[] = [
        ...(data ?? []),
        ...newAuthenticators.map(authenticator => ({
          ...authenticator,
          id: generateAuthenticatorId(authenticator),
        })),
      ];
      await AsyncStorage.setItem('authenticators', JSON.stringify(newData));
      return newData;
    },
    onSuccess(newData) {
      updateAuthenticatorListData(queryClient, newData);
    },
  });
}

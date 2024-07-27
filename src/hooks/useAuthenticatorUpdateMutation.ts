import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {
  Authenticator,
  AuthenticatorWithoutId,
} from '../parsers/authenticatorParser';
import useAuthenticatorListQuery, {
  updateAuthenticatorListData,
} from './useAuthenticatorListQuery';

type UpdatingAuthenticator = Pick<Authenticator, 'id'> &
  Partial<AuthenticatorWithoutId>;

export default function useAuthenticatorUpdateMutation() {
  const queryClient = useQueryClient();
  const {data} = useAuthenticatorListQuery();

  return useMutation({
    async mutationFn(authenticator: UpdatingAuthenticator) {
      const newData: Authenticator[] = [...(data ?? [])];
      const index = newData.findIndex(a => a.id === authenticator.id);

      if (index === -1) {
        throw new Error('Authenticator not found.');
      }

      newData[index] = {...newData[index], ...authenticator};
      await AsyncStorage.setItem('authenticators', JSON.stringify(newData));
      return newData;
    },
    onSuccess(newData) {
      updateAuthenticatorListData(queryClient, newData);
    },
  });
}

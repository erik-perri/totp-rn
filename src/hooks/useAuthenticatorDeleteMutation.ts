import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Authenticator} from '../parsers/authenticatorParser';
import useAuthenticatorListQuery, {
  updateAuthenticatorListData,
} from './useAuthenticatorListQuery';

export default function useAuthenticatorDeleteMutation() {
  const queryClient = useQueryClient();
  const {data} = useAuthenticatorListQuery();

  return useMutation({
    async mutationFn(id: Authenticator['id']) {
      const newData: Authenticator[] = [...(data ?? [])];
      const index = newData.findIndex(a => a.id === id);

      if (index === -1) {
        throw new Error('Authenticator not found.');
      }

      newData.splice(index, 1);
      await AsyncStorage.setItem('authenticators', JSON.stringify(newData));
      return newData;
    },
    onSuccess(newData) {
      updateAuthenticatorListData(queryClient, newData);
    },
  });
}

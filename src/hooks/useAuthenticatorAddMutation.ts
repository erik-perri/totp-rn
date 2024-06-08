import AsyncStorage from '@react-native-async-storage/async-storage';
import {useMutation, useQueryClient} from '@tanstack/react-query';

import {Authenticator} from '../parsers/authenticatorParser';
import useAuthenticatorListQuery, {
  updateAuthenticatorListData,
} from './useAuthenticatorListQuery';

export default function useAuthenticatorAddMutation() {
  const queryClient = useQueryClient();
  const {data} = useAuthenticatorListQuery();

  return useMutation({
    mutationFn: async (newAuthenticator: Authenticator) => {
      const newData: Authenticator[] = [...(data ?? []), newAuthenticator];
      await AsyncStorage.setItem('authenticators', JSON.stringify(newData));
      return newData;
    },
    onSuccess(newData) {
      updateAuthenticatorListData(queryClient, newData);
    },
  });
}

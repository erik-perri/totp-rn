import {useCallback} from 'react';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import compareAuthenticator from '../utilities/compareAuthenticator';
import useAuthenticatorList from './useAuthenticatorList';

export default function useAuthenticatorDuplicateCheck() {
  const authenticators = useAuthenticatorList();

  return useCallback(
    (authenticator: AuthenticatorWithoutId) => {
      return authenticators.some(existing =>
        compareAuthenticator(existing, authenticator),
      );
    },
    [authenticators],
  );
}

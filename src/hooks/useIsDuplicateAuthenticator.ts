import {useCallback} from 'react';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import compareAuthenticator from '../utilities/compareAuthenticator';
import useAuthenticatorListQuery from './useAuthenticatorListQuery';

export default function useIsDuplicateAuthenticator() {
  const {data} = useAuthenticatorListQuery();

  return useCallback(
    (authenticator: AuthenticatorWithoutId) => {
      if (!data) {
        // TODO This would probably be a bug, we should always have at least an
        //      array at this point
        return false;
      }

      return data.some(existing =>
        compareAuthenticator(existing, authenticator),
      );
    },
    [data],
  );
}

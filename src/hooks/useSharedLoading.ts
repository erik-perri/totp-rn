import {useCallback, useEffect, useMemo, useRef} from 'react';

import sharedLoadingSet from '../stores/SharedLoadingStore/sharedLoadingSet';
import useSharedLoadingStore from '../stores/useSharedLoadingStore';

export default function useSharedLoading(
  key: string,
  component: string,
): [boolean, (loading: boolean) => void] {
  const componentSymbol = useRef(Symbol(component));
  const sharedLoadingState = useSharedLoadingStore(state => state.loadingState);

  const setLoading = useCallback(
    (loading: boolean) => {
      sharedLoadingSet(key, componentSymbol.current, loading);
    },
    [key],
  );

  const loading = useMemo(() => {
    const currentContext = sharedLoadingState.get(key);

    return Boolean(currentContext && currentContext.size > 0);
  }, [key, sharedLoadingState]);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [setLoading]);

  return [loading, setLoading];
}

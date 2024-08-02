import {useCallback, useEffect, useMemo, useRef} from 'react';

import useSharedLoadingStore from '../stores/useSharedLoadingStore';

export default function useSharedLoading(key: string, component: string) {
  const componentSymbol = useRef(Symbol(component));
  const setSharedLoading = useSharedLoadingStore(state => state.setLoading);
  const sharedLoadingState = useSharedLoadingStore(state => state.state);

  const setLoading = useCallback(
    (loading: boolean) => {
      setSharedLoading(key, componentSymbol.current, loading);
    },
    [key, setSharedLoading],
  );

  const loading = useMemo(() => {
    const currentContext = sharedLoadingState[key];

    return currentContext && currentContext.size > 0;
  }, [key, sharedLoadingState]);

  useEffect(() => {
    return () => {
      setLoading(false);
    };
  }, [setLoading]);

  return {setLoading, loading};
}

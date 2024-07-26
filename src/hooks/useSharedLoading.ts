import {RefObject, useCallback, useMemo} from 'react';

import {
  useSharedLoadingSetLoading,
  useSharedLoadingState,
} from '../stores/useSharedLoadingStore';

export default function useSharedLoading(
  key: string,
  component: symbol | RefObject<symbol>,
) {
  const setSharedLoading = useSharedLoadingSetLoading();
  const sharedLoadingState = useSharedLoadingState();

  const setLoading = useCallback(
    (loading: boolean) => {
      const componentSymbol = isSymbolRef(component)
        ? component.current
        : component;

      if (!componentSymbol) {
        return;
      }

      setSharedLoading(key, componentSymbol, loading);
    },
    [component, key, setSharedLoading],
  );

  const loading = useMemo(() => {
    const currentContext = sharedLoadingState[key];

    if (!currentContext) {
      return false;
    }

    return currentContext.length > 0;
  }, [key, sharedLoadingState]);

  return {setLoading, loading};
}

function isSymbolRef(
  value: symbol | RefObject<symbol>,
): value is RefObject<symbol> {
  return Object.prototype.hasOwnProperty.call(value, 'current');
}

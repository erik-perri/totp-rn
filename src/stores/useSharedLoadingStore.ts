import {create} from 'zustand';

type SharedLoadingStore = {
  loadingState: Map<string, Set<symbol>>;

  setLoading: (key: string, component: symbol, loading: boolean) => void;
};

/**
 * Contains a map of sets that track a shared loading state for the key. This is
 * used to allow child components to let their parent know when they are loading
 * and need actions to be disabled.
 */
const useSharedLoadingStore = create<SharedLoadingStore>(set => ({
  loadingState: new Map(),

  setLoading: (key, component, loading: boolean) => {
    set(state => {
      const loadingState = new Map(state.loadingState);
      const currentLoadingForKey = loadingState.get(key) ?? new Set<symbol>();

      if (loading) {
        currentLoadingForKey.add(component);
      } else {
        currentLoadingForKey.delete(component);
      }

      loadingState.set(key, currentLoadingForKey);

      return {loadingState};
    });
  },
}));

export default useSharedLoadingStore;

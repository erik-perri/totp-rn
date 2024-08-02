import {create} from 'zustand';

type SharedLoadingStore = {
  setLoading: (key: string, component: symbol, loading: boolean) => void;
  loadingState: Map<string, Set<symbol>>;
};

const useSharedLoadingStore = create<SharedLoadingStore>(set => ({
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
  loadingState: new Map(),
}));

export default useSharedLoadingStore;

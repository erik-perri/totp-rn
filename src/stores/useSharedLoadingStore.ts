import {create} from 'zustand';

type SharedLoadingStore = {
  setLoading: (key: string, component: symbol, loading: boolean) => void;
  state: Record<string, Set<symbol> | undefined>;
};

const useSharedLoadingStore = create<SharedLoadingStore>(set => ({
  setLoading: (key, component, loading: boolean) => {
    set(state => {
      const currentLoadingForKey = state.state[key] ?? new Set<symbol>();

      if (loading) {
        currentLoadingForKey.add(component);
      } else {
        currentLoadingForKey.delete(component);
      }

      return {state: {...state.state, [key]: currentLoadingForKey}};
    });
  },
  state: {},
}));

export default useSharedLoadingStore;

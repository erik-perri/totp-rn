import {create} from 'zustand';

type SharedLoadingStore = {
  setLoading: (key: string, component: symbol, loading: boolean) => void;
  state: Record<string, symbol[] | undefined>;
};

const useSharedLoadingStore = create<SharedLoadingStore>((set, get) => ({
  setLoading: (key, component, loading: boolean) => {
    const loadingState = get().state;

    const currentLoadingForKey = loadingState[key] || [];

    if (loading) {
      currentLoadingForKey.push(component);
    } else {
      const index = currentLoadingForKey.indexOf(component);
      if (index !== -1) {
        currentLoadingForKey.splice(index, 1);
      }
    }

    set({state: {...loadingState, [key]: currentLoadingForKey}});
  },
  state: {},
}));

export default useSharedLoadingStore;

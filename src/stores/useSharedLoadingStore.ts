import {create} from 'zustand';

type SharedLoadingStore = {
  loadingState: Map<string, Set<symbol>>;
};

/**
 * Contains a map of sets that track a shared loading state for the key. This is
 * used to allow child components to let their parent know when they are loading
 * and need actions to be disabled.
 */
const useSharedLoadingStore = create<SharedLoadingStore>()(() => ({
  loadingState: new Map(),
}));

export default useSharedLoadingStore;

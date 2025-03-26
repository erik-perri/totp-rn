import useSharedLoadingStore from '../useSharedLoadingStore';

export default function sharedLoadingSet(
  key: string,
  component: symbol,
  loading: boolean,
): void {
  useSharedLoadingStore.setState(state => {
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
}

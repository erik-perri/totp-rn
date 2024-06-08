import {create} from 'zustand';

type CurrentTimeStore = {
  currentTime: number;
  updateCurrentTime: () => void;
};

/**
 * Store the current time in a store, this allows us to synchronize the render
 * updates across the authenticator cards. It will also eventually allow us to
 * detect out of sync clocks and apply an offset to the time.
 */
const useCurrentTimeStore = create<CurrentTimeStore>(set => ({
  currentTime: Date.now(),
  updateCurrentTime: () => {
    set({currentTime: Date.now()});
  },
}));

const selectCurrentTime = (state: CurrentTimeStore) => state.currentTime;
const selectUpdateCurrentTime = (state: CurrentTimeStore) =>
  state.updateCurrentTime;

export const useCurrentTime = () => useCurrentTimeStore(selectCurrentTime);
export const useUpdateCurrentTime = () =>
  useCurrentTimeStore(selectUpdateCurrentTime);

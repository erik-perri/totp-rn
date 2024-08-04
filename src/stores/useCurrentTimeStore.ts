import {create} from 'zustand';

type CurrentTimeStore = {
  currentTime: number;

  updateCurrentTime: () => void;
};

/**
 * Contains current time, updated every second. This allows us to synchronize
 * the render updates across the authenticator cards.
 *
 * It will also eventually allow us to detect out of sync clocks and apply an
 * offset to the time.
 */
const useCurrentTimeStore = create<CurrentTimeStore>(set => ({
  currentTime: Date.now(),

  updateCurrentTime: () => {
    set({currentTime: Date.now()});
  },
}));

export default useCurrentTimeStore;

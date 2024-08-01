import {useEffect} from 'react';

import useCurrentTimeStore from '../stores/useCurrentTimeStore';

export default function useCurrentTimeUpdater() {
  const updateCurrentTime = useCurrentTimeStore(
    state => state.updateCurrentTime,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updateCurrentTime]);
}

import {useEffect} from 'react';
import {useUpdateCurrentTime} from '../stores/useCurrentTimeStore';

export default function useCurrentTimeUpdater() {
  const updateCurrentTime = useUpdateCurrentTime();

  useEffect(() => {
    const interval = setInterval(() => {
      updateCurrentTime();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [updateCurrentTime]);
}

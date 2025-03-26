import {useEffect} from 'react';

import currentTimeUpdate from '../stores/CurrentTimeStore/currentTimeUpdate';

export default function useCurrentTimeUpdater() {
  useEffect(() => {
    const interval = setInterval(() => {
      currentTimeUpdate();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);
}

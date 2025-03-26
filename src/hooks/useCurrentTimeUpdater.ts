import {useEffect, useRef} from 'react';

import currentTimeUpdate from '../stores/CurrentTimeStore/currentTimeUpdate';

export default function useCurrentTimeUpdater() {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    function update() {
      const delay = 1000 - (Date.now() % 1000);

      timeoutId.current = setTimeout(() => {
        currentTimeUpdate();
        update();
      }, delay);
    }

    update();

    return () => {
      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }
    };
  }, []);
}

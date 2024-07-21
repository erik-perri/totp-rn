import {useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import * as Keychain from 'react-native-keychain';

type EnrolledStatus = 'enrolled' | 'not_enrolled' | 'error';

export default function useBiometricsIsEnrolled(): EnrolledStatus {
  const [status, setStatus] = useState<EnrolledStatus>('not_enrolled');

  const refresh = useCallback(async () => {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      setStatus(biometryType === null ? 'not_enrolled' : 'enrolled');
    } catch (error) {
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    void refresh();

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (nextAppState === 'active') {
        void refresh();
      }
    });

    return () => {
      subscription.remove();
    };
  }, [refresh]);

  return status;
}

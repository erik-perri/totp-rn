import {useCallback, useEffect, useState} from 'react';
import {AppState} from 'react-native';
import * as Keychain from 'react-native-keychain';

type EnrolledStatus = 'enrolled' | 'not_enrolled';

export default function useBiometricsStatus() {
  const [enrolledStatus, setEnrolledStatus] = useState<EnrolledStatus>();
  const [enrolledError, setEnrolledError] = useState<unknown>();

  const refresh = useCallback(async () => {
    try {
      const biometryType = await Keychain.getSupportedBiometryType();
      setEnrolledError(undefined);
      setEnrolledStatus(biometryType === null ? 'not_enrolled' : 'enrolled');
    } catch (error) {
      setEnrolledError(error);
      setEnrolledStatus(undefined);
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

  return {
    enrolledError,
    enrolledStatus,
  };
}

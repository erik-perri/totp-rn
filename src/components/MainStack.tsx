import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent, useMemo} from 'react';

import usePublicSettingsStore from '../stores/usePublicSettingsStore';
import useSecureSettingsStore from '../stores/useSecureSettingsStore';
import AuthenticatorListScreen from './AuthenticatorListScreen/AuthenticatorListScreen';
import FatalErrorScreen from './FatalErrorScreen';
import OnboardingBiometricsScreen from './OnboardingBiometricsScreen/OnboardingBiometricsScreen';
import OnboardingDatabaseCreateScreen from './OnboardingDatabaseCreateScreen/OnboardingDatabaseCreateScreen';
import OnboardingDatabaseOpenScreen from './OnboardingDatabaseOpenScreen/OnboardingDatabaseOpenScreen';
import OnboardingStorageScreen from './OnboardingStorageScreen/OnboardingStorageScreen';
import QrCodeScannerScreen from './QrCodeScannerScreen/QrCodeScannerScreen';
import UnlockScreen from './UnlockScreen/UnlockScreen';

export type MainStackParamList = {
  AuthenticatorList: undefined;
  OnboardingBiometrics: undefined;
  OnboardingDatabaseCreate: undefined;
  OnboardingDatabaseOpen: undefined;
  OnboardingStorage: undefined;
  QrCodeScanner: undefined;
  Unlock: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FunctionComponent = () => {
  const initialized = usePublicSettingsStore(state => state.initialized);
  const error = usePublicSettingsStore(state => state.error);
  const hasPublicSettings = usePublicSettingsStore(
    state => state.settings !== undefined,
  );
  const unlocked = useSecureSettingsStore(
    state => state.secureSettings !== undefined,
  );

  const initialRouteName: keyof MainStackParamList = useMemo(() => {
    if (!hasPublicSettings) {
      // TODO Detect existing database in internal storage and show a screen
      //      asking to open it or start fresh. Likely someone aborting
      //      onboarding?
      return 'OnboardingDatabaseCreate';
    }

    return 'AuthenticatorList';
  }, [hasPublicSettings]);

  if (!initialized) {
    return null;
  }

  if (error) {
    // TODO Add a way to retry or re-create the settings without needing the
    //      user to clear the app data.
    return <FatalErrorScreen error={error} />;
  }

  if (!unlocked && hasPublicSettings) {
    return <UnlockScreen />;
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRouteName}
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen
        component={AuthenticatorListScreen}
        name="AuthenticatorList"
        options={{
          title: 'Authenticator List',
        }}
      />
      <Stack.Screen
        component={OnboardingBiometricsScreen}
        name="OnboardingBiometrics"
        options={{
          title: 'Enable Biometrics',
        }}
      />
      <Stack.Screen
        component={OnboardingDatabaseCreateScreen}
        name="OnboardingDatabaseCreate"
        options={{
          title: 'Create Database',
        }}
      />
      <Stack.Screen
        component={OnboardingDatabaseOpenScreen}
        name="OnboardingDatabaseOpen"
        options={{
          title: 'Open Database',
        }}
      />
      <Stack.Screen
        component={OnboardingStorageScreen}
        name="OnboardingStorage"
        options={{
          title: 'Storage Location',
        }}
      />
      <Stack.Screen
        component={QrCodeScannerScreen}
        name="QrCodeScanner"
        options={{
          title: 'Scan QR Code',
        }}
      />
      <Stack.Screen
        component={UnlockScreen}
        name="Unlock"
        options={{
          title: 'Unlock',
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStack;

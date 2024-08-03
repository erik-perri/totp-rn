import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent, useMemo} from 'react';

import useAppSettings from '../hooks/useAppSettings';
import AuthenticatorListScreen from './AuthenticatorListScreen/AuthenticatorListScreen';
import FatalErrorScreen from './FatalErrorScreen';
import OnboardingBiometricsScreen from './OnboardingBiometricsScreen/OnboardingBiometricsScreen';
import OnboardingDatabaseCreateScreen from './OnboardingDatabaseCreateScreen/OnboardingDatabaseCreateScreen';
import OnboardingDatabaseOpenScreen from './OnboardingDatabaseOpenScreen/OnboardingDatabaseOpenScreen';
import OnboardingStorageScreen from './OnboardingStorageScreen/OnboardingStorageScreen';
import QrCodeScannerScreen from './QrCodeScannerScreen/QrCodeScannerScreen';

export type MainStackParamList = {
  AuthenticatorList: undefined;
  OnboardingBiometrics: undefined;
  OnboardingDatabaseCreate: undefined;
  OnboardingDatabaseOpen: undefined;
  OnboardingStorage: undefined;
  QrCodeScanner: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FunctionComponent = () => {
  const {settingsError, settingsLoading, settings} = useAppSettings();

  const initialRouteName: keyof MainStackParamList = useMemo(() => {
    if (!settings) {
      // TODO Detect existing database in internal storage and show a screen
      //      asking to open it or start fresh. Likely someone aborting
      //      onboarding?
      // return 'OnboardingDatabaseCreate';
    }

    // TODO Detect if composite key and master password are available
    //      and show unlock screen if not

    return 'AuthenticatorList';
  }, [settings]);

  if (settingsLoading) {
    return null;
  }

  if (settingsError) {
    // TODO Add a way to retry or re-create the settings without needing the
    //      user to clear the app data.
    return <FatalErrorScreen error={settingsError} />;
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
    </Stack.Navigator>
  );
};

export default MainStack;

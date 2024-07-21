import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent, useMemo} from 'react';

import useAppSettingsQuery from '../hooks/useAppSettingsQuery';
import AuthenticatorListScreen from './AuthenticatorListScreen/AuthenticatorListScreen';
import OnboardingBiometricsScreen from './OnboardingBiometricsScreen/OnboardingBiometricsScreen';
import OnboardingDatabaseCreateScreen from './OnboardingDatabaseCreateScreen/OnboardingDatabaseCreateScreen';
import OnboardingStorageScreen from './OnboardingStorageScreen/OnboardingStorageScreen';
import QrCodeScannerScreen from './QrCodeScannerScreen/QrCodeScannerScreen';

export type MainStackParamList = {
  AuthenticatorList: undefined;
  OnboardingBiometrics: undefined;
  OnboardingDatabaseCreate: undefined;
  OnboardingStorage: undefined;
  QrCodeScanner: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FunctionComponent = () => {
  const {data: appSettings, isPending: isAppSettingsPending} =
    useAppSettingsQuery();

  const initialRouteName: keyof MainStackParamList = useMemo(() => {
    if (appSettings === null) {
      // return 'OnboardingDatabaseCreate';
    }

    return 'AuthenticatorList';
  }, [appSettings]);

  if (isAppSettingsPending) {
    return null;
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
          title: 'Database Setup',
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

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';

import AuthenticatorListScreen from './AuthenticatorListScreen/AuthenticatorListScreen';
import QrCodeScannerScreen from './QrCodeScannerScreen/QrCodeScannerScreen';

export type MainStackParamList = {
  AuthenticatorList: undefined;
  QrCodeScanner: undefined;
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainStack: FunctionComponent = () => {
  return (
    <Stack.Navigator
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

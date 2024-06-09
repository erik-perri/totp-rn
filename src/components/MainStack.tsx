import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';

import AuthenticatorListScreen from './AuthenticatorListScreen/AuthenticatorListScreen';

export type MainStackParamList = {
  AuthenticatorList: undefined;
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
    </Stack.Navigator>
  );
};

export default MainStack;

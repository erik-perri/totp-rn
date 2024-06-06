import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthenticatorListScreen from './components/AuthenticatorList/AuthenticatorListScreen';
import {StatusBar} from 'react-native';

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <StatusBar
        animated
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
      <AuthenticatorListScreen />
    </SafeAreaProvider>
  );
}

export default App;

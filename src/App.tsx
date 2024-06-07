import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthenticatorListScreen from './components/AuthenticatorList/AuthenticatorListScreen';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App(): React.JSX.Element {
  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          animated
          backgroundColor="transparent"
          translucent
          barStyle="dark-content"
        />
        <AuthenticatorListScreen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

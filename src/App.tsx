import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AuthenticatorListScreen from './components/AuthenticatorList/AuthenticatorListScreen';
import {StatusBar} from 'react-native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import useCurrentTimeUpdater from './hooks/useCurrentTimeUpdater';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

function App(): React.JSX.Element {
  useCurrentTimeUpdater();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          animated
          backgroundColor="transparent"
          barStyle="dark-content"
          translucent
        />
        <AuthenticatorListScreen />
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

import './theme';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

import FatalErrorBoundary from './components/FatalErrorBoundary';
import MainStack from './components/MainStack';
import useCurrentTimeUpdater from './hooks/useCurrentTimeUpdater';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchOnWindowFocus: false,
      retry: false,
      retryOnMount: false,
      staleTime: Infinity,
    },
  },
});

function App(): React.JSX.Element {
  const scheme = useColorScheme();

  useCurrentTimeUpdater();

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar
        animated
        backgroundColor="transparent"
        barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
        translucent
      />
      <GestureHandlerRootView>
        <NavigationContainer>
          <FatalErrorBoundary>
            <BottomSheetModalProvider>
              <MainStack />
            </BottomSheetModalProvider>
          </FatalErrorBoundary>
        </NavigationContainer>
      </GestureHandlerRootView>
    </QueryClientProvider>
  );
}

export default App;

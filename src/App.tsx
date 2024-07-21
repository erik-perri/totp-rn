import './theme';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import MainStack from './components/MainStack';
import useCurrentTimeUpdater from './hooks/useCurrentTimeUpdater';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      staleTime: Infinity,
    },
  },
});

function App(): React.JSX.Element {
  const scheme = useColorScheme();

  useCurrentTimeUpdater();

  return (
    <SafeAreaProvider>
      <QueryClientProvider client={queryClient}>
        <StatusBar
          animated
          backgroundColor="transparent"
          barStyle={scheme === 'dark' ? 'light-content' : 'dark-content'}
          translucent
        />
        <GestureHandlerRootView>
          <NavigationContainer>
            <BottomSheetModalProvider>
              <MainStack />
            </BottomSheetModalProvider>
          </NavigationContainer>
        </GestureHandlerRootView>
      </QueryClientProvider>
    </SafeAreaProvider>
  );
}

export default App;

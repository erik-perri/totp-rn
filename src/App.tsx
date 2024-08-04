import './theme';

import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {StatusBar, useColorScheme} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';

import FatalErrorBoundary from './components/FatalErrorBoundary';
import MainStack from './components/MainStack';
import useCurrentTimeUpdater from './hooks/useCurrentTimeUpdater';
import usePublicSettingsStore from './stores/usePublicSettingsStore';

function App(): React.JSX.Element {
  const scheme = useColorScheme();
  const load = usePublicSettingsStore(state => state.load);

  useCurrentTimeUpdater();

  useEffect(() => {
    void load();
  }, [load]);

  return (
    <SafeAreaProvider>
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
    </SafeAreaProvider>
  );
}

export default App;

import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';
import {Pressable} from 'react-native';

type PressableShellProps = PropsWithChildren<{
  disabled?: boolean;
  onPress: () => Promise<void> | void;
}>;

function PressableShell({
  children,
  disabled,
  onPress,
}: PressableShellProps): ReactElement {
  return (
    <Pressable disabled={disabled} onPress={() => void onPress()}>
      {({pressed}) => (
        <PressableProvider.Provider value={{disabled, pressed}}>
          {children}
        </PressableProvider.Provider>
      )}
    </Pressable>
  );
}

type PressableContext = {
  disabled: boolean | undefined;
  pressed: boolean;
};

const PressableProvider = createContext<PressableContext>({
  disabled: false,
  pressed: false,
});

export function usePressableContext() {
  return useContext<PressableContext>(PressableProvider);
}

export default PressableShell;

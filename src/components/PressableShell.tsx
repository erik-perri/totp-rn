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
        <PressableContext.Provider value={{disabled, pressed}}>
          {children}
        </PressableContext.Provider>
      )}
    </Pressable>
  );
}

const PressableContext = createContext<{
  disabled: boolean | undefined;
  pressed: boolean;
}>({
  disabled: false,
  pressed: false,
});

export function usePressableContext() {
  return useContext(PressableContext);
}

export default PressableShell;

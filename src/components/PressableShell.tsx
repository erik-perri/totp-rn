import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
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
  const onPressContainer = useCallback(() => {
    void onPress();
  }, [onPress]);

  return (
    <Pressable disabled={disabled} onPress={onPressContainer}>
      {({pressed}) => {
        return (
          <PressableContext.Provider
            value={{
              disabled,
              pressed,
              state: disabled ? 'disabled' : pressed ? 'pressed' : undefined,
            }}>
            {children}
          </PressableContext.Provider>
        );
      }}
    </Pressable>
  );
}

const PressableContext = createContext<{
  disabled: boolean | undefined;
  pressed: boolean;
  state?: 'pressed' | 'disabled';
}>({
  disabled: false,
  pressed: false,
  state: undefined,
});

export function usePressableContext() {
  return useContext(PressableContext);
}

export default PressableShell;

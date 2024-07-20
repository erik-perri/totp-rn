import React, {
  Context,
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from 'react';
import {Pressable} from 'react-native';

import ButtonBox from './ButtonBox';

export type ButtonTheme = 'ghost' | 'solid';

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onPress: () => Promise<void> | void;
  theme: ButtonTheme;
}>;

const Button: FunctionComponent<ButtonProps> = ({
  children,
  disabled,
  onPress,
  theme,
}) => {
  return (
    <Pressable disabled={disabled} onPress={() => void onPress()}>
      {({pressed}) => (
        <ButtonProvider.Provider value={{disabled, pressed, theme}}>
          <ButtonBox>{children}</ButtonBox>
        </ButtonProvider.Provider>
      )}
    </Pressable>
  );
};

type ButtonContext = {
  disabled: boolean | undefined;
  pressed: boolean;
  theme: ButtonTheme;
};

const ButtonProvider = createContext<ButtonContext>({
  disabled: false,
  pressed: false,
  theme: 'solid',
});

export function useButtonContext() {
  return useContext<ButtonContext>(ButtonProvider);
}

export default Button;

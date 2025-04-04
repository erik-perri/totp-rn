import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useContext,
} from 'react';

import PressableShell from '../PressableShell';
import ButtonBox from './ButtonBox';

export type ButtonVariant = 'ghost' | 'solid';

type ButtonProps = PropsWithChildren<{
  disabled?: boolean;
  onPress: () => Promise<void> | void;
  variant: ButtonVariant;
}>;

const Button: FunctionComponent<ButtonProps> = ({
  children,
  disabled,
  onPress,
  variant,
}) => {
  return (
    <PressableShell disabled={disabled} onPress={onPress}>
      <ButtonContext.Provider value={{variant}}>
        <ButtonBox>{children}</ButtonBox>
      </ButtonContext.Provider>
    </PressableShell>
  );
};

const ButtonContext = createContext<{
  variant: ButtonVariant;
}>({
  variant: 'solid',
});

export function useButtonContext() {
  return useContext(ButtonContext);
}

export default Button;

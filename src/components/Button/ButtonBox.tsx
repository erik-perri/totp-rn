import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';
import {useButtonContext} from './Button';

const ButtonBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {disabled, pressed} = usePressableContext();
  const {variant} = useButtonContext();

  const {styles} = useStyles(stylesheet, {variant});

  return <View style={styles.container(disabled, pressed)}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: (disabled: boolean | undefined, pressed: boolean) => ({
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    justifyContent: 'flex-start',
    paddingBottom: 12,
    paddingEnd: 12,
    paddingStart: 12,
    paddingTop: 12,

    variants: {
      variant: {
        default: {
          //
        },
        ghost: {
          backgroundColor: disabled
            ? theme.colors.button.ghost.disabled.background
            : pressed
            ? theme.colors.button.ghost.pressed.background
            : theme.colors.button.ghost.enabled.background,
          borderColor: disabled
            ? theme.colors.button.ghost.disabled.background
            : pressed
            ? theme.colors.button.ghost.pressed.background
            : theme.colors.button.ghost.enabled.background,
        },
        solid: {
          backgroundColor: disabled
            ? theme.colors.button.solid.disabled.background
            : pressed
            ? theme.colors.button.solid.pressed.background
            : theme.colors.button.solid.enabled.background,
          borderColor: disabled
            ? theme.colors.button.solid.disabled.background
            : pressed
            ? theme.colors.button.solid.pressed.background
            : theme.colors.button.solid.enabled.background,
        },
      },
    },
  }),
}));

export default ButtonBox;

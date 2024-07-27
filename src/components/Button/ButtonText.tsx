import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';
import {useButtonContext} from './Button';

const ButtonText: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {disabled, pressed} = usePressableContext();
  const {variant} = useButtonContext();

  const {styles} = useStyles(stylesheet, {variant});

  return <Text style={styles.text(disabled, pressed)}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  text: (disabled: boolean | undefined, pressed: boolean) => ({
    fontSize: theme.fontSize.base,

    variants: {
      variant: {
        default: {
          //
        },
        ghost: {
          color: disabled
            ? theme.colors.button.ghost.disabled.text
            : pressed
            ? theme.colors.button.ghost.pressed.text
            : theme.colors.button.ghost.enabled.text,
        },
        solid: {
          color: disabled
            ? theme.colors.button.solid.disabled.text
            : pressed
            ? theme.colors.button.solid.pressed.text
            : theme.colors.button.solid.enabled.text,
        },
      },
    },
  }),
}));

export default ButtonText;

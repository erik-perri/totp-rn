import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';
import {useButtonContext} from './Button';

const ButtonText: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);
  const {variant} = useButtonContext();

  const textStyles = usePressableVariant(
    {
      default: {
        base: styles.text,
        disabled: styles.textDisabled,
        pressed: styles.textPressed,
      },
      ghost: {
        base: styles.ghostText,
        disabled: styles.ghostTextDisabled,
        pressed: styles.ghostTextPressed,
      },
      solid: {
        base: styles.solidText,
        disabled: styles.solidTextDisabled,
        pressed: styles.solidTextPressed,
      },
    },
    variant,
  );

  return <Text style={textStyles}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  ghostText: {
    color: theme.colors.button.ghost.enabled.text,
  },
  ghostTextDisabled: {
    color: theme.colors.button.ghost.disabled.text,
  },
  ghostTextPressed: {
    color: theme.colors.button.ghost.pressed.text,
  },
  solidText: {
    color: theme.colors.button.solid.enabled.text,
  },
  solidTextDisabled: {
    color: theme.colors.button.solid.disabled.text,
  },
  solidTextPressed: {
    color: theme.colors.button.solid.pressed.text,
  },
  text: {
    fontSize: theme.fontSize.base,
  },
  textDisabled: {
    //
  },
  textPressed: {
    //
  },
}));

export default ButtonText;

import React, {FunctionComponent, PropsWithChildren, useMemo} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useButtonContext} from './Button';

const ButtonText: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);
  const {disabled, pressed, theme} = useButtonContext();

  const textStyles = useMemo(() => {
    const stateStyles = disabled
      ? styles.textDisabled
      : pressed
      ? styles.textPressed
      : {};

    switch (theme) {
      case 'ghost':
        return [
          styles.text,
          stateStyles,
          disabled
            ? styles.ghostTextDisabled
            : pressed
            ? styles.ghostTextPressed
            : styles.ghostText,
        ];
      case 'solid':
        return [
          styles.text,
          stateStyles,
          disabled
            ? styles.solidTextDisabled
            : pressed
            ? styles.solidTextPressed
            : styles.solidText,
        ];
    }
  }, [disabled, pressed, styles, theme]);

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

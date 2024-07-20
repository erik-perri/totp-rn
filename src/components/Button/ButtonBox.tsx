import React, {FunctionComponent, PropsWithChildren, useMemo} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useButtonContext} from './Button';

const ButtonBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);
  const {disabled, pressed, theme} = useButtonContext();

  const containerStyles = useMemo(() => {
    const stateStyles = disabled
      ? styles.containerDisabled
      : pressed
      ? styles.containerPressed
      : {};

    switch (theme) {
      case 'ghost':
        return [
          styles.container,
          stateStyles,
          disabled
            ? styles.ghostContainerDisabled
            : pressed
            ? styles.ghostContainerPressed
            : styles.ghostContainer,
        ];
      case 'solid':
        return [
          styles.container,
          stateStyles,
          disabled
            ? styles.solidContainerDisabled
            : pressed
            ? styles.solidContainerPressed
            : styles.solidContainer,
        ];
    }
  }, [disabled, pressed, styles, theme]);

  return <View style={containerStyles}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  containerPressed: {
    //
  },
  containerDisabled: {
    //
  },
  solidContainer: {
    backgroundColor: theme.colors.button.solid.enabled.background,
  },
  solidContainerDisabled: {
    backgroundColor: theme.colors.button.solid.disabled.background,
  },
  solidContainerPressed: {
    backgroundColor: theme.colors.button.solid.pressed.background,
  },
  ghostContainer: {
    backgroundColor: theme.colors.button.ghost.enabled.background,
  },
  ghostContainerDisabled: {
    backgroundColor: theme.colors.button.ghost.disabled.background,
  },
  ghostContainerPressed: {
    backgroundColor: theme.colors.button.ghost.pressed.background,
  },
}));

export default ButtonBox;

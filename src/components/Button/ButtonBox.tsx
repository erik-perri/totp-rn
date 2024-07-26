import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';
import {useButtonContext} from './Button';

const ButtonBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);
  const {variant} = useButtonContext();

  const containerStyles = usePressableVariant(
    {
      default: {
        base: styles.container,
        pressed: styles.containerPressed,
        disabled: styles.containerDisabled,
      },
      ghost: {
        base: styles.ghostContainer,
        pressed: styles.ghostContainerPressed,
        disabled: styles.ghostContainerDisabled,
      },
      solid: {
        base: styles.solidContainer,
        pressed: styles.solidContainerPressed,
        disabled: styles.solidContainerDisabled,
      },
    },
    variant,
  );

  return <View style={containerStyles}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    borderWidth: 1,
    justifyContent: 'flex-start',
    paddingBottom: 12,
    paddingEnd: 12,
    paddingStart: 12,
    paddingTop: 12,
  },
  containerPressed: {
    //
  },
  containerDisabled: {
    //
  },
  solidContainer: {
    backgroundColor: theme.colors.button.solid.enabled.background,
    borderColor: theme.colors.button.solid.enabled.background,
  },
  solidContainerDisabled: {
    backgroundColor: theme.colors.button.solid.disabled.background,
    borderColor: theme.colors.button.solid.disabled.background,
  },
  solidContainerPressed: {
    backgroundColor: theme.colors.button.solid.pressed.background,
    borderColor: theme.colors.button.solid.pressed.background,
  },
  ghostContainer: {
    backgroundColor: theme.colors.button.ghost.enabled.background,
    borderColor: theme.colors.button.ghost.enabled.background,
  },
  ghostContainerDisabled: {
    backgroundColor: theme.colors.button.ghost.disabled.background,
    borderColor: theme.colors.button.ghost.disabled.background,
  },
  ghostContainerPressed: {
    backgroundColor: theme.colors.button.ghost.pressed.background,
    borderColor: theme.colors.button.ghost.pressed.background,
  },
}));

export default ButtonBox;

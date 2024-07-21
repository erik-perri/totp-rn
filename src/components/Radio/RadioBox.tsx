import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';
import {useRadioContext} from './Radio';

const RadioBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);
  const state = useRadioContext();

  const containerStyles = usePressableVariant(
    {
      default: {
        base: styles.container,
        pressed: styles.containerPressed,
        selected: styles.containerSelected,
      },
    },
    'default',
    state,
  );

  return <View style={containerStyles}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.radio.base.background,
    borderColor: theme.colors.radio.base.border,
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 8,
  },
  containerPressed: {
    backgroundColor: theme.colors.radio.pressed.background,
    borderColor: theme.colors.radio.pressed.border,
  },
  containerSelected: {
    backgroundColor: theme.colors.radio.selected.background,
    borderColor: theme.colors.radio.selected.border,
  },
  text: {
    color: theme.colors.radio.base.text,
    fontSize: theme.fontSize.base,
  },
  textSelected: {
    color: theme.colors.radio.selected.text,
  },
}));

export default RadioBox;

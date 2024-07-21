import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';
import {useRadioContext} from './Radio';

const RadioText: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);
  const state = useRadioContext();

  const textStyles = usePressableVariant(
    {
      default: {
        base: styles.text,
        pressed: styles.textPressed,
        selected: styles.textSelected,
      },
    },
    'default',
    state,
  );

  return <Text style={textStyles}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  text: {
    color: theme.colors.radio.base.text,
    fontSize: theme.fontSize.base,
  },
  textPressed: {
    color: theme.colors.radio.pressed.text,
  },
  textSelected: {
    color: theme.colors.radio.selected.text,
  },
}));

export default RadioText;

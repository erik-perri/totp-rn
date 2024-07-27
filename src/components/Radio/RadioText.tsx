import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';
import {useRadioContext} from './Radio';

const RadioText: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {state} = usePressableContext();
  const {selected} = useRadioContext();

  const {styles} = useStyles(stylesheet, {state});

  return <Text style={styles.text(selected)}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  text: (selected: boolean) => ({
    color: theme.colors.radio.base.text,
    fontSize: theme.fontSize.base,

    variants: {
      state: {
        default: {
          color: selected
            ? theme.colors.radio.selected.text
            : theme.colors.radio.base.text,
        },
        disabled: {
          //
        },
        pressed: {
          color: theme.colors.radio.pressed.text,
        },
      },
    },
  }),
}));

export default RadioText;

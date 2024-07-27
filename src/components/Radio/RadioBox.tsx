import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';
import {useRadioContext} from './Radio';

const RadioBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {state} = usePressableContext();
  const {selected} = useRadioContext();

  const {styles} = useStyles(stylesheet, {
    state,
  });

  return <View style={styles.container(selected)}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: (selected: boolean) => ({
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'center',
    padding: 8,

    variants: {
      state: {
        default: {
          backgroundColor: selected
            ? theme.colors.radio.selected.background
            : theme.colors.radio.base.background,
          borderColor: selected
            ? theme.colors.radio.selected.border
            : theme.colors.radio.base.border,
        },
        disabled: {
          //
        },
        pressed: {
          backgroundColor: theme.colors.radio.pressed.background,
          borderColor: theme.colors.radio.pressed.border,
        },
      },
    },
  }),
}));

export default RadioBox;

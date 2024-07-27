import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';

const FormSelectBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {state} = usePressableContext();
  const {styles} = useStyles(stylesheet, {state});

  return <View style={styles.container}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    borderWidth: 1,
    flexDirection: 'row',
    flexGrow: 1,
    gap: 8,
    justifyContent: 'space-between',
    margin: 0,
    minHeight: 46,
    paddingBottom: 8,
    paddingEnd: 12,
    paddingStart: 12,
    paddingTop: 8,

    variants: {
      state: {
        default: {
          backgroundColor: theme.colors.selectBox.base.background,
          borderColor: theme.colors.selectBox.base.border,
        },
        disabled: {
          //
        },
        pressed: {
          borderColor: theme.colors.selectBox.pressed.border,
          backgroundColor: theme.colors.selectBox.pressed.background,
        },
      },
    },
  },
}));

export default FormSelectBox;

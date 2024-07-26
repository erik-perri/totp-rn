import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';

const FormSelectBox: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);

  const containerStyles = usePressableVariant(
    {
      default: {
        base: styles.container,
        pressed: styles.containerPressed,
        disabled: styles.containerDisabled,
      },
    },
    'default',
  );

  return <View style={containerStyles}>{children}</View>;
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    backgroundColor: theme.colors.selectBox.base.background,
    borderColor: theme.colors.selectBox.base.border,
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
  },
  containerPressed: {
    borderColor: theme.colors.selectBox.pressed.border,
    backgroundColor: theme.colors.selectBox.pressed.background,
  },
  containerDisabled: {
    // TODO
  },
}));

export default FormSelectBox;

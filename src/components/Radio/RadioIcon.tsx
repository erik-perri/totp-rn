import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';
import {useRadioContext} from './Radio';

type RadioIconProps = {
  icon: IconProp;
};

const RadioIcon: FunctionComponent<RadioIconProps> = ({icon}) => {
  const {state} = usePressableContext();
  const {selected} = useRadioContext();

  const {styles} = useStyles(stylesheet, {state});

  return <FontAwesomeIcon icon={icon} style={styles.text(selected)} />;
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

export default RadioIcon;

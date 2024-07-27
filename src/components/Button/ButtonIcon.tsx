import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {usePressableContext} from '../PressableShell';
import {useButtonContext} from './Button';

type ButtonIconProps = {
  icon: IconProp;
};

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({icon}) => {
  const {disabled, pressed} = usePressableContext();
  const {variant} = useButtonContext();

  const {styles} = useStyles(stylesheet, {variant});

  return <FontAwesomeIcon icon={icon} style={styles.text(disabled, pressed)} />;
};

const stylesheet = createStyleSheet(theme => ({
  text: (disabled: boolean | undefined, pressed: boolean) => ({
    variants: {
      variant: {
        default: {
          //
        },
        ghost: {
          color: disabled
            ? theme.colors.button.ghost.disabled.text
            : pressed
            ? theme.colors.button.ghost.pressed.text
            : theme.colors.button.ghost.enabled.text,
        },
        solid: {
          color: disabled
            ? theme.colors.button.solid.disabled.text
            : pressed
            ? theme.colors.button.solid.pressed.text
            : theme.colors.button.solid.enabled.text,
        },
      },
    },
  }),
}));

export default ButtonIcon;

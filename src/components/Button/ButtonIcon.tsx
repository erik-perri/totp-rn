import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';
import {useButtonContext} from './Button';

type ButtonIconProps = {
  icon: IconProp;
};

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({icon}) => {
  const {styles} = useStyles(stylesheet);
  const {variant} = useButtonContext();

  const iconStyles = usePressableVariant(
    {
      default: {
        base: styles.text,
        disabled: styles.textDisabled,
        pressed: styles.textPressed,
      },
      ghost: {
        base: styles.ghostText,
        disabled: styles.ghostTextDisabled,
        pressed: styles.ghostTextPressed,
      },
      solid: {
        base: styles.solidText,
        disabled: styles.solidTextDisabled,
        pressed: styles.solidTextPressed,
      },
    },
    variant,
  );

  return <FontAwesomeIcon icon={icon} style={iconStyles} />;
};

const stylesheet = createStyleSheet(theme => ({
  ghostText: {
    color: theme.colors.button.ghost.enabled.text,
  },
  ghostTextDisabled: {
    color: theme.colors.button.ghost.disabled.text,
  },
  ghostTextPressed: {
    color: theme.colors.button.ghost.pressed.text,
  },
  solidText: {
    color: theme.colors.button.solid.enabled.text,
  },
  solidTextDisabled: {
    color: theme.colors.button.solid.disabled.text,
  },
  solidTextPressed: {
    color: theme.colors.button.solid.pressed.text,
  },
  text: {
    //
  },
  textDisabled: {
    //
  },
  textPressed: {
    //
  },
}));

export default ButtonIcon;

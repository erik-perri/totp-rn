import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent, useMemo} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useButtonContext} from './Button';

type ButtonIconProps = {
  icon: IconProp;
};

const ButtonIcon: FunctionComponent<ButtonIconProps> = ({icon}) => {
  const {styles} = useStyles(stylesheet);
  const {disabled, pressed, theme} = useButtonContext();

  const iconStyles = useMemo(() => {
    const stateStyles = disabled
      ? styles.textDisabled
      : pressed
      ? styles.textPressed
      : {};

    switch (theme) {
      case 'ghost':
        return [
          styles.text,
          stateStyles,
          disabled
            ? styles.ghostTextDisabled
            : pressed
            ? styles.ghostTextPressed
            : styles.ghostText,
        ];
      case 'solid':
        return [
          styles.text,
          stateStyles,
          disabled
            ? styles.solidTextDisabled
            : pressed
            ? styles.solidTextPressed
            : styles.solidText,
        ];
    }
  }, [disabled, pressed, styles, theme]);

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
    fontSize: theme.fontSize.base,
  },
  textDisabled: {
    //
  },
  textPressed: {
    //
  },
}));

export default ButtonIcon;

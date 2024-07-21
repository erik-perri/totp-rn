import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import usePressableVariant from '../../hooks/usePressableVariant';
import {useRadioContext} from './Radio';

type RadioIconProps = {
  icon: IconProp;
};

const RadioIcon: FunctionComponent<RadioIconProps> = ({icon}) => {
  const {styles} = useStyles(stylesheet);
  const state = useRadioContext();

  const iconStyles = usePressableVariant(
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

  return <FontAwesomeIcon icon={icon} style={iconStyles} />;
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

export default RadioIcon;

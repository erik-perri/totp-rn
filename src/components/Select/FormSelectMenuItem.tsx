import {faCheck} from '@fortawesome/free-solid-svg-icons';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import Button from '../Button/Button';
import ButtonIcon from '../Button/ButtonIcon';
import ButtonText from '../Button/ButtonText';

type FormSelectMenuItemProps = {
  checked?: boolean;
  label: string;
  onPress: () => void;
};

const FormSelectMenuItem: FunctionComponent<FormSelectMenuItemProps> = ({
  checked,
  label,
  onPress,
}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <Button onPress={onPress} variant="ghost">
      <View style={styles.iconContainer}>
        {checked && <ButtonIcon icon={faCheck} />}
      </View>
      <ButtonText>{label}</ButtonText>
    </Button>
  );
};

const stylesheet = createStyleSheet(() => ({
  iconContainer: {
    minWidth: 20,
  },
}));

export default FormSelectMenuItem;

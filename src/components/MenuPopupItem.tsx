import {IconProp} from '@fortawesome/fontawesome-svg-core';
import React, {FunctionComponent} from 'react';

import Button from './Button/Button';
import ButtonIcon from './Button/ButtonIcon';
import ButtonText from './Button/ButtonText';

type MenuPopupItemProps = {
  icon: IconProp;
  label: string;
  onPress: () => void;
};

const MenuPopupItem: FunctionComponent<MenuPopupItemProps> = ({
  icon,
  label,
  onPress,
}) => {
  return (
    <Button onPress={onPress} theme="ghost">
      <ButtonIcon icon={icon} />
      <ButtonText>{label}</ButtonText>
    </Button>
  );
};

export default MenuPopupItem;

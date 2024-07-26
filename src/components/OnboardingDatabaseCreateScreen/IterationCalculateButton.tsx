import {faArrowRotateRight} from '@fortawesome/free-solid-svg-icons';
import React, {FunctionComponent} from 'react';

import Button from '../Button/Button';
import ButtonIcon from '../Button/ButtonIcon';
import ButtonText from '../Button/ButtonText';

type IterationCalculateButtonProps = {
  disabled?: boolean;
  onPress: () => void;
};

const IterationCalculateButton: FunctionComponent<
  IterationCalculateButtonProps
> = ({disabled, onPress}) => {
  return (
    <Button disabled={disabled} onPress={onPress} variant="ghost">
      <ButtonText>1s</ButtonText>
      <ButtonIcon icon={faArrowRotateRight} />
    </Button>
  );
};

export default IterationCalculateButton;

import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';

import PressableShell from '../PressableShell';
import RadioBox from './RadioBox';
import {useRadioGroupContext} from './RadioGroup';

type RadioProps<T> = PropsWithChildren<{
  value: T;
}>;

function Radio<T>({children, value}: RadioProps<T>): ReactElement {
  const {currentValue, setValue} = useRadioGroupContext<T>();

  return (
    <PressableShell
      onPress={() => {
        setValue(value);
      }}>
      <RadioContext.Provider value={{selected: currentValue === value}}>
        <RadioBox>{children}</RadioBox>
      </RadioContext.Provider>
    </PressableShell>
  );
}

const RadioContext = createContext<{
  selected: boolean;
}>({
  selected: false,
});

export function useRadioContext() {
  return useContext(RadioContext);
}

export default Radio;

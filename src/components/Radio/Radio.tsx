import React, {
  createContext,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import PressableShell from '../PressableShell';
import RadioBox from './RadioBox';
import {useRadioGroupContext} from './RadioGroup';

type RadioProps<T> = PropsWithChildren<{
  value: T;
}>;

function Radio<T>({children, value}: RadioProps<T>): ReactElement {
  const {currentValue, setValue} = useRadioGroupContext<T>();

  const onPressShell = useCallback(() => {
    setValue(value);
  }, [setValue, value]);

  const providerValue = useMemo(
    () => ({selected: currentValue === value}),
    [currentValue, value],
  );

  return (
    <PressableShell onPress={onPressShell}>
      <RadioContext.Provider value={providerValue}>
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

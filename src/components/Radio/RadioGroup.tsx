import React, {
  Context,
  createContext,
  PropsWithChildren,
  ReactElement,
  useContext,
} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type RadioGroupProps<T> = PropsWithChildren<{
  onChange: (value: T) => void;
  value: T;
}>;

function RadioGroup<T>({
  children,
  onChange,
  value,
}: RadioGroupProps<T>): ReactElement {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <RadioGroupContext.Provider
        value={{
          currentValue: value,
          setValue: onChange as (value: unknown) => void,
        }}>
        {children}
      </RadioGroupContext.Provider>
    </View>
  );
}

const stylesheet = createStyleSheet(() => ({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
  },
}));

type RadioGroupState<T> = {
  currentValue: T;
  setValue: (value: T) => void;
};

const RadioGroupContext = createContext<RadioGroupState<unknown>>({
  currentValue: undefined,
  setValue: () => {
    throw new Error('Radio components must be used within a RadioGroup');
  },
});

export function useRadioGroupContext<T>() {
  return useContext<RadioGroupState<T>>(
    RadioGroupContext as Context<RadioGroupState<T>>,
  );
}

export default RadioGroup;

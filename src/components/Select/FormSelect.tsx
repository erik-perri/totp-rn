import {faChevronDown} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {Text, useWindowDimensions, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {useFormGroupContext} from '../FormGroup';
import MenuPopup from '../MenuPopup';
import PressableShell from '../PressableShell';
import FormSelectBox from './FormSelectBox';
import FormSelectMenuItem from './FormSelectMenuItem';

type FormSelectProps<T> = {
  disabled?: boolean;
  emptyLabel: string;
  onChange: (value: T) => void;
  options: Readonly<Array<{label: string; value: T}>>;
  value: T | undefined;
};

const FormSelect = <T extends string>({
  disabled,
  emptyLabel,
  onChange,
  options,
  value,
}: FormSelectProps<T>) => {
  const {styles} = useStyles(stylesheet);
  const dimensions = useWindowDimensions();
  const maxHeight = useMemo(() => dimensions.height * 0.5, [dimensions]);
  const [isOpen, setIsOpen] = useState(false);
  const {addLabelPressEventListener} = useFormGroupContext();

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const onCancel = useCallback(() => {
    setIsOpen(false);
  }, []);

  useEffect(() => {
    const unsubscribe = addLabelPressEventListener(() => {
      onOpen();
    });

    return () => {
      unsubscribe();
    };
  }, [addLabelPressEventListener, onOpen]);

  const currentOption = useMemo(
    () => options.find(option => option.value === value),
    [options, value],
  );

  const [inputDisplay, inputStyle] = useMemo(() => {
    if (value === undefined) {
      return [emptyLabel, styles.inputEmpty];
    }

    if (currentOption === undefined) {
      return [`Unknown option "${value}"`, styles.inputEmpty];
    }

    return [currentOption.label, styles.inputFilled];
  }, [currentOption, emptyLabel, styles.inputEmpty, styles.inputFilled, value]);

  return (
    <View style={styles.container}>
      <PressableShell disabled={disabled} onPress={onOpen}>
        <FormSelectBox>
          <Text numberOfLines={1} style={[styles.input, inputStyle]}>
            {inputDisplay}
          </Text>

          <FontAwesomeIcon icon={faChevronDown} style={styles.icon} />
        </FormSelectBox>
      </PressableShell>

      <MenuPopup
        maxDynamicContentSize={maxHeight}
        isOpen={isOpen}
        onClose={onCancel}>
        {options.map(option => (
          <FormSelectMenuItem
            key={option.value}
            checked={option.value === value}
            label={option.label}
            onPress={() => {
              onChange(option.value);
              setIsOpen(false);
            }}
          />
        ))}
      </MenuPopup>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    flexGrow: 1,
  },
  icon: {
    color: theme.colors.text,
    borderColor: theme.colors.input.text,
  },
  input: {
    fontSize: theme.fontSize.md,
    flexShrink: 1,
  },
  inputEmpty: {
    color: theme.colors.textAlt,
  },
  inputFilled: {
    color: theme.colors.input.text,
  },
}));

export default FormSelect;

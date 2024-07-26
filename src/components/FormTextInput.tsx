import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
} from 'react';
import {Pressable, Text, TextInput} from 'react-native';
import {InputModeOptions} from 'react-native/Libraries/Components/TextInput/TextInput';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useFormGroupLabelSelector from '../hooks/useFormGroupLabelSelector';

type FormTextInputProps = {
  inputMode?: InputModeOptions;
  onChangeText: (value: string) => void;
  onSubmitEditing?: () => Promise<void> | void;
  secureTextEntry?: boolean;
  suffix?: string;
  value: string;
};

const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  (
    {inputMode, onChangeText, onSubmitEditing, secureTextEntry, suffix, value},
    ref,
  ) => {
    const {styles} = useStyles(stylesheet);

    const elementRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => elementRef.current as TextInput);

    useFormGroupLabelSelector(elementRef);

    const onContainerPress = useCallback(() => {
      elementRef.current?.focus();
    }, []);

    const handleSubmitEditing = useCallback(() => {
      if (onSubmitEditing) {
        void onSubmitEditing();
      }
    }, [onSubmitEditing]);

    return (
      <Pressable onPress={onContainerPress} style={styles.container}>
        <TextInput
          inputMode={inputMode}
          onChangeText={onChangeText}
          onSubmitEditing={handleSubmitEditing}
          ref={elementRef}
          secureTextEntry={secureTextEntry}
          style={styles.input}
          value={value}
        />

        {suffix && <Text style={styles.suffix}>{suffix}</Text>}
      </Pressable>
    );
  },
);

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    flexDirection: 'row',
    flexGrow: 1,
    gap: 8,
    justifyContent: 'space-between',
    minHeight: 46,
    paddingBottom: 8,
    paddingEnd: 12,
    paddingStart: 12,
    paddingTop: 8,
  },
  input: {
    color: theme.colors.input.text,
    flexShrink: 1,
    fontSize: theme.fontSize.md,
    margin: 0,
    paddingBottom: 0,
    paddingEnd: 0,
    paddingStart: 0,
    paddingTop: 0,
  },
  suffix: {
    color: theme.colors.textAlt,
    flexGrow: 0,
    flexShrink: 0,
    fontSize: theme.fontSize.base,
  },
}));

export default FormTextInput;

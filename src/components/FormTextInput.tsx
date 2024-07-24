import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {TextInput} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useFormGroupLabelSelector from '../hooks/useFormGroupLabelSelector';

type FormTextInputProps = {
  onChangeText: (value: string) => void;
  onEndEditing?: () => void;
  secureTextEntry?: boolean;
  value: string;
};

const FormTextInput = forwardRef<TextInput, FormTextInputProps>(
  ({onChangeText, onEndEditing, secureTextEntry, value}, ref) => {
    const {styles} = useStyles(stylesheet);

    const elementRef = useRef<TextInput>(null);

    useImperativeHandle(ref, () => elementRef.current as TextInput);

    useFormGroupLabelSelector(elementRef);

    return (
      <TextInput
        onChangeText={onChangeText}
        onEndEditing={onEndEditing}
        ref={elementRef}
        secureTextEntry={secureTextEntry}
        style={styles.input}
        value={value}
      />
    );
  },
);

const stylesheet = createStyleSheet(theme => ({
  input: {
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    color: theme.colors.input.text,
    fontSize: theme.fontSize.md,
    margin: 0,
    paddingBottom: 8,
    paddingEnd: 12,
    paddingStart: 12,
    paddingTop: 8,
  },
}));

export default FormTextInput;

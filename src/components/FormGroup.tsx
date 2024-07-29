import React, {
  createContext,
  FunctionComponent,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {Pressable, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type FormGroupProps = PropsWithChildren<{
  error?: string;
  label: string;
}>;

const FormGroup: FunctionComponent<FormGroupProps> = ({
  children,
  error,
  label,
}) => {
  const {styles} = useStyles(stylesheet);

  const [labelPressHandlers, setLabelPressHandlers] = useState<
    LabelPressEventHandler[]
  >([]);

  const addLabelPressEventListener = useCallback(
    (handler: LabelPressEventHandler) => {
      setLabelPressHandlers(handlers => [...handlers, handler]);
      return () => {
        setLabelPressHandlers(handlers => handlers.filter(h => h !== handler));
      };
    },
    [],
  );

  const handleLabelPress = useCallback(() => {
    labelPressHandlers.forEach(handler => {
      handler();
    });
  }, [labelPressHandlers]);

  const hasError = useMemo(() => error !== undefined, [error]);

  return (
    <View style={styles.root}>
      <FormGroupContext.Provider value={{addLabelPressEventListener, hasError}}>
        <Pressable onPress={handleLabelPress} style={styles.labelContainer}>
          <Text style={styles.label}>{label}</Text>
        </Pressable>
        <View style={styles.inputContainer}>{children}</View>
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.error}>{error}</Text>
          </View>
        )}
      </FormGroupContext.Provider>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  error: {
    color: theme.colors.alertBox.error.text,
    fontSize: theme.fontSize.sm,
  },
  errorContainer: {
    //
  },
  inputContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  label: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
  },
  labelContainer: {
    //
  },
  root: {
    flexGrow: 1,
    gap: 4,
  },
}));

type LabelPressEventHandler = () => void;
type LabelPressEventUnsubscribe = () => void;

const FormGroupContext = createContext<{
  addLabelPressEventListener: (
    handler: LabelPressEventHandler,
  ) => LabelPressEventUnsubscribe;
  hasError: boolean;
}>({
  addLabelPressEventListener: () => {
    throw new Error('useFormGroupContext must be used within a FormGroup');
  },
  hasError: false,
});

export function useFormGroupContext() {
  return useContext(FormGroupContext);
}

export default FormGroup;

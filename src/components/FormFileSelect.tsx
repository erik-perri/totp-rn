import React, {FunctionComponent, useCallback} from 'react';
import {Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {NativeFile, openDocumentFile} from '../modules/filesystemModule';
import Button from './Button/Button';
import ButtonText from './Button/ButtonText';

type FormFileInputProps = {
  mimeType: string;
  onChangeFile: (value: NativeFile) => Promise<void> | void;
  onStartChange?: () => void;
  value: NativeFile | undefined;
};

const FormFileSelect: FunctionComponent<FormFileInputProps> = ({
  mimeType,
  onChangeFile,
  onStartChange,
  value,
}) => {
  const {styles} = useStyles(stylesheet);

  const selectFile = useCallback(async () => {
    onStartChange?.();

    const file = await openDocumentFile(mimeType);

    if (file) {
      void onChangeFile(file);
    }
  }, [mimeType, onChangeFile, onStartChange]);

  return (
    <View style={styles.container}>
      <View style={styles.currentFileContainer}>
        {value ? (
          <Text numberOfLines={1} style={styles.currentFileText}>
            {value.name}
          </Text>
        ) : (
          <Text numberOfLines={1} style={styles.emptyText}>
            No file selected
          </Text>
        )}
      </View>
      <Button onPress={selectFile} variant="ghost">
        <ButtonText>Select File</ButtonText>
      </Button>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    flexGrow: 1,
    gap: 8,
    justifyContent: 'space-between',
  },
  currentFileContainer: {
    flexShrink: 1,
  },
  currentFileText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.sm,
  },
  emptyText: {
    color: theme.colors.textAlt,
    flexShrink: 1,
    fontSize: theme.fontSize.sm,
  },
}));

export default FormFileSelect;

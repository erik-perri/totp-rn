import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {NativeFile} from '../../modules/filesystemModule';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import FormFileSelect from '../FormFileSelect';
import FormGroup from '../FormGroup';
import FormTextInput from '../FormTextInput';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';

const OnboardingDatabaseOpenScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingDatabaseOpen'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);

  const [file, setFile] = useState<NativeFile>();
  const [fileError, setFileError] = useState<string>();
  const [masterPassword, setMasterPassword] = useState('');
  const [masterPasswordError, setMasterPasswordError] = useState<string>();

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onUnlockDatabase = useCallback(() => {
    setMasterPasswordError(undefined);

    if (!file) {
      return;
    }

    try {
      // const bytes = await readFile(file.uri);
      // TODO Read KDBX database, forward it and master password on
      navigation.navigate('OnboardingBiometrics');
    } catch (error) {
      if (error instanceof Error) {
        setMasterPasswordError(`Unable to unlock database. ${error.message}.`);
      } else {
        setMasterPasswordError('Unable to unlock database.');
      }
    }
  }, [file, navigation]);

  const isSubmitDisabled = useMemo(
    () => !file || fileError !== undefined || masterPassword.length === 0,
    [file, fileError, masterPassword],
  );

  const onStartChange = useCallback(() => {
    setFile(undefined);
    setFileError(undefined);
    setMasterPasswordError(undefined);
  }, []);

  const handleFileChange = useCallback((value: NativeFile) => {
    setFile(value);

    try {
      // const bytes = await readFile(value.uri);
      // parseKdbxHeader(bytes);
    } catch (error) {
      if (error instanceof Error) {
        // if (error instanceof KdbxError) {
        //   setFileError(`${error.message}.`);
        //   return;
        // }

        setFileError(`Unable to read file. ${error.message}`);
        return;
      }
    }
  }, []);

  return (
    <OnboardingShell>
      <Heading>Open Database</Heading>

      <Paragraph>Open a previously created database.</Paragraph>

      <FormGroup label="Database File" error={fileError}>
        <FormFileSelect
          mimeType={'application/*'}
          onChangeFile={handleFileChange}
          onStartChange={onStartChange}
          value={file}
        />
      </FormGroup>

      <FormGroup label="Master Password" error={masterPasswordError}>
        <FormTextInput
          onChangeText={setMasterPassword}
          secureTextEntry
          value={masterPassword}
        />
      </FormGroup>

      <OnboardingActions>
        <View style={styles.buttonContainer}>
          <Button onPress={onBack} variant="ghost">
            <ButtonText>Back</ButtonText>
          </Button>
          <Button
            disabled={isSubmitDisabled}
            onPress={onUnlockDatabase}
            variant="solid">
            <ButtonText>Unlock Database</ButtonText>
          </Button>
        </View>
      </OnboardingActions>
    </OnboardingShell>
  );
};

const stylesheet = createStyleSheet(() => ({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}));

export default OnboardingDatabaseOpenScreen;

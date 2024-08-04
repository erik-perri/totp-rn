import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {NativeFile} from '../../modules/filesystemModule';
import useOnboardingStore from '../../stores/useOnboardingStore';
import openKdbxDatabase from '../../utilities/kdbx/openKdbxDatabase';
import validateKdbxFile from '../../utilities/kdbx/validateKdbxFile';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import ErrorBox from '../ErrorBox';
import FormFileSelect from '../FormFileSelect';
import FormGroup from '../FormGroup';
import FormTextInput from '../FormTextInput';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingContent from '../OnboardingContent';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';

const OnboardingDatabaseOpenScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingDatabaseOpen'>
> = ({navigation}) => {
  const openDatabase = useOnboardingStore(state => state.openDatabase);

  const [file, setFile] = useState<NativeFile>();
  const [fileError, setFileError] = useState<string>();
  const [generalError, setGeneralError] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  const [masterPassword, setMasterPassword] = useState('');
  const [masterPasswordError, setMasterPasswordError] = useState<string>();

  const isSubmitDisabled = useMemo(
    () => !file || fileError !== undefined || masterPassword.length === 0,
    [file, fileError, masterPassword],
  );

  const onBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onChangeFile = useCallback(async (value: NativeFile) => {
    setFile(value);

    const result = await validateKdbxFile(value);

    if (!result.success) {
      setFileError(result.message);
    }
  }, []);

  const onStartChange = useCallback(() => {
    setFile(undefined);
    setFileError(undefined);
    setGeneralError(undefined);
    setMasterPasswordError(undefined);
  }, []);

  const onUnlockDatabase = useCallback(async () => {
    setMasterPasswordError(undefined);
    setGeneralError(undefined);

    if (isSubmitDisabled || !file) {
      setGeneralError(new Error('Invalid options.'));
      return;
    }

    setLoading(true);

    try {
      const result = await openKdbxDatabase(file, masterPassword);

      setMasterPassword('');

      if (result.file.database.metadata.generator !== 'RnTotp') {
        setFileError('Only databases created with this app are supported.');
        return;
      }

      openDatabase(file, result.compositeKey, masterPassword);

      navigation.navigate('OnboardingBiometrics');
    } catch (error) {
      if (error instanceof Error && error.message === 'HMAC mismatch') {
        setMasterPasswordError(`Unable to unlock database. ${error.message}.`);
      } else {
        setGeneralError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [file, isSubmitDisabled, masterPassword, navigation, openDatabase]);

  useEffect(() => {
    setGeneralError(undefined);
  }, [file, masterPassword]);

  useEffect(() => {
    setMasterPasswordError(undefined);
  }, [masterPassword]);

  return (
    <OnboardingShell>
      <OnboardingContent>
        <Heading>Open Database</Heading>

        <Paragraph>Open a previously created database.</Paragraph>

        {generalError !== undefined && <ErrorBox error={generalError} />}

        <FormGroup label="Database File" error={fileError}>
          <FormFileSelect
            mimeType={'application/*'}
            onChangeFile={onChangeFile}
            onStartChange={onStartChange}
            value={file}
          />
        </FormGroup>

        <FormGroup label="Master Password" error={masterPasswordError}>
          <FormTextInput
            onChangeText={setMasterPassword}
            onSubmitEditing={onUnlockDatabase}
            secureTextEntry
            value={masterPassword}
          />
        </FormGroup>
      </OnboardingContent>

      <OnboardingActions>
        <Button disabled={loading} onPress={onBack} variant="ghost">
          <ButtonText>Back</ButtonText>
        </Button>
        <Button
          disabled={loading || isSubmitDisabled}
          onPress={onUnlockDatabase}
          variant="solid">
          <ButtonText>Unlock Database</ButtonText>
        </Button>
      </OnboardingActions>
    </OnboardingShell>
  );
};

export default OnboardingDatabaseOpenScreen;

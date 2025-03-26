import {useFocusEffect} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useSharedLoading from '../../hooks/useSharedLoading';
import onboardingClear from '../../stores/OnboardingStore/onboardingClear';
import onboardingCreateDatabase from '../../stores/OnboardingStore/onboardingCreateDatabase';
import isKdfParametersValid from '../../utilities/isKdfParametersValid';
import createKdbxDatabase, {
  EncryptionAlgorithm,
  KdfParameters,
} from '../../utilities/kdbx/createKdbxDatabase';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import ErrorBox from '../ErrorBox';
import FormGroup from '../FormGroup';
import FormTextInput from '../FormTextInput';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingContent from '../OnboardingContent';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';
import DatabaseOptionsAdvanced from './DatabaseOptionsAdvanced';

const OnboardingDatabaseCreateScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingDatabaseCreate'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);

  const [loading, setLoading] = useSharedLoading(
    'OnboardingDatabaseCreateScreen',
    OnboardingDatabaseCreateScreen.name,
  );
  const [encryptionAlgorithm, setEncryptionAlgorithm] =
    useState<EncryptionAlgorithm>();
  const [generalError, setGeneralError] = useState<unknown>();
  const [kdfParameters, setKdfParameters] = useState<KdfParameters>();
  const [masterPassword, setMasterPassword] = useState('');

  const isCreateBlocked = useMemo(
    () =>
      !masterPassword ||
      !encryptionAlgorithm ||
      !isKdfParametersValid(kdfParameters),
    [encryptionAlgorithm, kdfParameters, masterPassword],
  );

  const onCreateDatabase = useCallback(async () => {
    if (!encryptionAlgorithm || !isKdfParametersValid(kdfParameters)) {
      setGeneralError(new Error('Invalid options.'));
      return;
    }

    setGeneralError(undefined);
    setLoading(true);

    try {
      const result = await createKdbxDatabase(
        masterPassword,
        encryptionAlgorithm,
        kdfParameters,
      );

      onboardingCreateDatabase(
        result.bytes,
        result.compositeKey,
        masterPassword,
      );

      navigation.navigate('OnboardingStorage');
    } catch (err) {
      setGeneralError(err);
    } finally {
      setLoading(false);
    }
  }, [
    encryptionAlgorithm,
    kdfParameters,
    masterPassword,
    navigation,
    setLoading,
  ]);

  const onOpenDatabase = useCallback(() => {
    navigation.navigate('OnboardingDatabaseOpen');
  }, [navigation]);

  const onChangeDatabaseOptions = useCallback(
    (algorithm: EncryptionAlgorithm, parameters: KdfParameters) => {
      setEncryptionAlgorithm(algorithm);
      setKdfParameters(parameters);
    },
    [],
  );

  useEffect(() => {
    setGeneralError(undefined);
  }, [encryptionAlgorithm, kdfParameters, masterPassword]);

  useFocusEffect(
    useCallback(() => {
      // If we end up back on this screen, clear out the onboarding store.
      onboardingClear();

      return () => {
        setMasterPassword('');
        setGeneralError(undefined);
      };
    }, []),
  );

  return (
    <OnboardingShell>
      <OnboardingContent>
        <Heading>Create Database</Heading>

        <Paragraph>
          Authenticators are stored in a KeePass database file. Biometrics can
          be enabled to unlock the database without the master password.
        </Paragraph>

        {generalError !== undefined && <ErrorBox error={generalError} />}

        <View style={styles.formContainer}>
          <FormGroup label="Master Password">
            <FormTextInput
              onChangeText={setMasterPassword}
              secureTextEntry
              value={masterPassword}
            />
          </FormGroup>

          {/* TODO Add basic flow with only password and an advanced button */}
          <DatabaseOptionsAdvanced onChange={onChangeDatabaseOptions} />
        </View>
      </OnboardingContent>

      <OnboardingActions>
        <Button disabled={loading} onPress={onOpenDatabase} variant="ghost">
          <ButtonText>Open Database</ButtonText>
        </Button>
        <Button
          disabled={loading || isCreateBlocked}
          onPress={onCreateDatabase}
          variant="solid">
          <ButtonText>Create Database</ButtonText>
        </Button>
      </OnboardingActions>
    </OnboardingShell>
  );
};

const stylesheet = createStyleSheet(() => ({
  formContainer: {
    gap: 16,
  },
}));

export default OnboardingDatabaseCreateScreen;

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  FunctionComponent,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useSharedLoading from '../../hooks/useSharedLoading';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import FormGroup from '../FormGroup';
import FormTextInput from '../FormTextInput';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingContent from '../OnboardingContent';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';
import AdvancedDatabaseOptions, {
  AdvancedDatabaseOptionsData,
} from './AdvancedDatabaseOptions';

const OnboardingDatabaseCreateScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingDatabaseCreate'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);
  const {loading} = useSharedLoading(
    'OnboardingDatabaseCreateScreen',
    useRef(Symbol('OnboardingDatabaseCreateScreen')),
  );
  const [options, setOptions] = useState<AdvancedDatabaseOptionsData>();
  const [masterPassword, setMasterPassword] = useState('');

  const onCreateDatabase = useCallback(() => {
    // TODO Create KDBX database, forward it and master password on
    navigation.navigate('OnboardingStorage');
  }, [navigation]);

  const onOpenDatabase = useCallback(() => {
    navigation.navigate('OnboardingDatabaseOpen');
  }, [navigation]);

  const isCreateBlocked = useMemo(
    () => loading || !masterPassword || !isAdvancedOptionsValid(options),
    [loading, masterPassword, options],
  );

  return (
    <OnboardingShell>
      <OnboardingContent>
        <Heading>Create Database</Heading>

        <Paragraph>
          Authenticators are stored in a KeePass database file. Biometrics can
          be enabled to unlock the database without the master password.
        </Paragraph>

        <View style={styles.formContainer}>
          <FormGroup label="Master Password">
            <FormTextInput
              onChangeText={setMasterPassword}
              secureTextEntry
              value={masterPassword}
            />
          </FormGroup>

          <AdvancedDatabaseOptions onChange={setOptions} />
        </View>
      </OnboardingContent>

      <OnboardingActions>
        <View style={styles.buttonContainer}>
          <Button disabled={loading} onPress={onOpenDatabase} variant="ghost">
            <ButtonText>Open Database</ButtonText>
          </Button>
          <Button
            disabled={isCreateBlocked}
            onPress={onCreateDatabase}
            variant="solid">
            <ButtonText>Create Database</ButtonText>
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
  formContainer: {
    gap: 16,
  },
}));

function isAdvancedOptionsValid(
  options: AdvancedDatabaseOptionsData | undefined,
): boolean {
  if (!options) {
    return false;
  }

  switch (options.type) {
    case 'aes':
      if (isNaN(options.iterations) || options.iterations < 1) {
        return false;
      }

      break;
    case 'argon2d':
    case 'argon2id':
      if (isNaN(options.iterations) || options.iterations < 1) {
        return false;
      }

      if (isNaN(options.memoryUsage) || options.memoryUsage < 1) {
        return false;
      }

      if (isNaN(options.parallelism) || options.parallelism < 1) {
        return false;
      }

      break;
  }

  return true;
}

export default OnboardingDatabaseCreateScreen;

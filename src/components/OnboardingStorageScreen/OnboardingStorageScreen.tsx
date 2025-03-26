import {
  faMobileScreenButton,
  faSdCard,
} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import {
  createDocumentFile,
  getInternalFile,
  writeFile,
} from '../../modules/filesystemModule';
import onboardingSetFile from '../../stores/OnboardingStore/onboardingSetFile';
import useOnboardingStore from '../../stores/useOnboardingStore';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import ErrorBox from '../ErrorBox';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingContent from '../OnboardingContent';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';
import ParagraphGroup from '../ParagraphGroup';
import Radio from '../Radio/Radio';
import RadioGroup from '../Radio/RadioGroup';
import RadioIcon from '../Radio/RadioIcon';
import RadioText from '../Radio/RadioText';

const OnboardingStorageScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingStorage'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);

  const [generalError, setGeneralError] = useState<unknown>();
  const [loading, setLoading] = useState(false);
  const [storageLocation, setStorageLocation] = useState<
    'internal' | 'external'
  >();

  const newDatabase = useOnboardingStore(state => state.newDatabase);

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSaveDatabase = useCallback(async () => {
    if (!newDatabase || !storageLocation) {
      setGeneralError(new Error('Invalid options.'));
      return;
    }

    setLoading(true);

    try {
      if (storageLocation === 'internal') {
        const file = await getInternalFile('authenticators.kdbx');

        await writeFile(file.uri, newDatabase);

        onboardingSetFile('internal', file);
      } else {
        const file = await createDocumentFile(
          'authenticators.kdbx',
          'application/kdbx',
        );

        if (file === null) {
          return;
        }

        await writeFile(file.uri, newDatabase);

        onboardingSetFile('external', file);
      }

      navigation.navigate('OnboardingBiometrics');
    } catch (error) {
      setGeneralError(error);
    } finally {
      setLoading(false);
    }
  }, [navigation, newDatabase, setLoading, storageLocation]);

  useEffect(() => {
    setGeneralError(undefined);
  }, [storageLocation]);

  return (
    <OnboardingShell>
      <OnboardingContent>
        <Heading>Storage Location</Heading>

        <ParagraphGroup>
          <Paragraph>
            Storing internally will keep your database stored inside the app's
            data directory. Your database will be lost if the app is uninstalled
            and you have not exported it beforehand.
          </Paragraph>
          <Paragraph>
            Storing externally will allow you to store your database using your
            device's document storage. This can be used to store in a cloud
            service installed, or in your device's external storage. Your
            database will only be lost if you delete it or lose access to the
            storage location.
          </Paragraph>
        </ParagraphGroup>

        {generalError !== undefined && <ErrorBox error={generalError} />}

        <View style={styles.radioContainer}>
          <RadioGroup onChange={setStorageLocation} value={storageLocation}>
            <Radio value="internal">
              <RadioIcon icon={faMobileScreenButton} />
              <RadioText>Internal Storage</RadioText>
            </Radio>
            <Radio value="external">
              <RadioIcon icon={faSdCard} />
              <RadioText>External Storage</RadioText>
            </Radio>
          </RadioGroup>
        </View>
      </OnboardingContent>

      <OnboardingActions>
        <Button disabled={loading} onPress={onGoBack} variant="ghost">
          <ButtonText>Back</ButtonText>
        </Button>
        <Button
          disabled={loading || storageLocation === undefined}
          onPress={onSaveDatabase}
          variant="solid">
          <ButtonText>Save Database</ButtonText>
        </Button>
      </OnboardingActions>
    </OnboardingShell>
  );
};

const stylesheet = createStyleSheet(() => ({
  radioContainer: {
    paddingVertical: 4,
  },
}));

export default OnboardingStorageScreen;

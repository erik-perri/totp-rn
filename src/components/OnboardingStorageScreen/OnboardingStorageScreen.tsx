import {
  faMobileScreenButton,
  faSdCard,
} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useCallback, useState} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
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
  const [storageLocation, setStorageLocation] = useState<
    'internal' | 'external'
  >();

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const onSaveDatabase = useCallback(() => {
    // TODO If internal, save database to internal storage
    //      If external, display document picker and save to selected file
    //      Forward transformed key and master password on
    navigation.navigate('OnboardingBiometrics');
  }, [navigation]);

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
        <View style={styles.buttonContainer}>
          <Button variant="ghost" onPress={onGoBack}>
            <ButtonText>Back</ButtonText>
          </Button>
          <Button
            disabled={storageLocation === undefined}
            variant="solid"
            onPress={onSaveDatabase}>
            <ButtonText>Save Database</ButtonText>
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
  radioContainer: {
    paddingVertical: 4,
  },
}));

export default OnboardingStorageScreen;

import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';
import {Alert, Linking, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useBiometricsIsEnrolled from '../../hooks/useBiometricsIsEnrolled';
import AlertBox from '../AlertBox';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';
import ParagraphGroup from '../ParagraphGroup';

function openSettings() {
  try {
    void Linking.sendIntent('android.settings.SECURITY_SETTINGS');
  } catch (error) {
    Alert.alert('An error occurred while opening settings.');
  }
}

const OnboardingBiometricsScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingBiometrics'>
> = ({navigation}) => {
  const enrolled = useBiometricsIsEnrolled();
  const {styles} = useStyles(stylesheet);

  function onGoBack() {
    navigation.goBack();
  }

  function onSkipBiometrics() {
    navigation.navigate('AuthenticatorList');
  }

  function onEnableBiometrics() {
    // TODO Save master password and transformed key into secure storage
    navigation.navigate('AuthenticatorList');
  }

  return (
    <OnboardingShell>
      <Heading>Enable Biometrics</Heading>

      <ParagraphGroup>
        <Paragraph>
          If enabled, the database master password will be stored and your
          biometrics will be used to unlock.
        </Paragraph>
        <Paragraph>
          If skipped, you will need to provide the database master password
          every time you open the app.
        </Paragraph>
      </ParagraphGroup>

      {enrolled === 'error' ? (
        <AlertBox
          message="An error occurred while checking biometric enrollment."
          theme="error"
        />
      ) : enrolled === 'not_enrolled' ? (
        <View style={styles.notEnrolledContainer}>
          <AlertBox
            message="No usable biometric devices are enrolled. Only class 3 devices are supported."
            theme="info"
          />
          <View style={styles.openSettingsContainer}>
            <Button onPress={openSettings} variant="ghost">
              <ButtonText>Open Settings</ButtonText>
            </Button>
          </View>
        </View>
      ) : null}

      <OnboardingActions>
        <View style={styles.buttonContainer}>
          <Button onPress={onGoBack} variant="ghost">
            <ButtonText>Back</ButtonText>
          </Button>
          <View style={styles.continueButtonContainer}>
            <Button onPress={onSkipBiometrics} variant="ghost">
              <ButtonText>Skip Biometrics</ButtonText>
            </Button>
            <Button
              disabled={enrolled !== 'enrolled'}
              onPress={onEnableBiometrics}
              variant="solid">
              <ButtonText>Enable Biometrics</ButtonText>
            </Button>
          </View>
        </View>
      </OnboardingActions>
    </OnboardingShell>
  );
};

const stylesheet = createStyleSheet(() => ({
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  continueButtonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 24,
  },
  notEnrolledContainer: {
    gap: 8,
  },
  openSettingsContainer: {
    alignItems: 'flex-end',
  },
}));

export default OnboardingBiometricsScreen;

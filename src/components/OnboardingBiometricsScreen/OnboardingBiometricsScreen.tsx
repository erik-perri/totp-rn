import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {Alert, Linking, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useBiometricsStatus from '../../hooks/useBiometricsStatus';
import {PublicSettings} from '../../parsers/publicSettingsParser';
import {SecureSettings} from '../../parsers/secureSettingsParser';
import useOnboardingStore from '../../stores/useOnboardingStore';
import usePublicSettingsStore from '../../stores/usePublicSettingsStore';
import useSecureSettingsStore from '../../stores/useSecureSettingsStore';
import isStorageSettingsValid from '../../utilities/isStorageSettingsValid';
import openKdbxDatabase from '../../utilities/kdbx/openKdbxDatabase';
import storeSecureSettings from '../../utilities/storeSecureSettings';
import AlertBox from '../AlertBox';
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
  const {styles} = useStyles(stylesheet);

  const {enrolledError, enrolledStatus} = useBiometricsStatus();
  const clearDetails = useOnboardingStore(state => state.clearDetails);
  const compositeKey = useOnboardingStore(state => state.compositeKey);
  const masterPassword = useOnboardingStore(state => state.masterPassword);
  const storageSettings = useOnboardingStore(state => state.storage);
  const unlock = useSecureSettingsStore(state => state.unlock);
  const save = usePublicSettingsStore(state => state.save);

  const [generalError, setGeneralError] = useState<unknown>();
  const [loading, setLoading] = useState(false);

  const saveSettings = useCallback(
    async (biometricsEnabled: boolean) => {
      if (
        !isStorageSettingsValid(storageSettings) ||
        compositeKey === undefined ||
        masterPassword === undefined
      ) {
        setGeneralError(new Error('Missing onboarding details'));
        return;
      }

      try {
        const publicSettings: PublicSettings = {
          biometricsEnabled,
          storage: storageSettings,
          settingsVersion: 1,
        };

        const secureSettings: SecureSettings = {
          compositeKey: Array.from(compositeKey),
          masterPassword,
          settingsVersion: 1,
        };

        const result = await openKdbxDatabase(
          storageSettings.file,
          Uint8Array.from(secureSettings.compositeKey),
        );

        if (biometricsEnabled) {
          await storeSecureSettings(secureSettings);
        }

        unlock(result.file, secureSettings);

        await save(publicSettings);

        navigation.reset({
          index: 0,
          routes: [{name: 'AuthenticatorList'}],
        });

        clearDetails();
      } catch (error) {
        setGeneralError(error);
      } finally {
        setLoading(false);
      }
    },
    [
      clearDetails,
      compositeKey,
      masterPassword,
      navigation,
      save,
      storageSettings,
      unlock,
    ],
  );

  const onGoBack = useCallback(() => {
    navigation.goBack();
  }, [navigation]);

  const displayError = useMemo(() => {
    if (enrolledError !== undefined) {
      return enrolledError;
    }

    return generalError;
  }, [enrolledError, generalError]);

  return (
    <OnboardingShell>
      <OnboardingContent>
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

        {enrolledStatus === 'not_enrolled' && (
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
        )}

        {displayError !== undefined && <ErrorBox error={displayError} />}
      </OnboardingContent>

      <OnboardingActions>
        <Button disabled={loading} onPress={onGoBack} variant="ghost">
          <ButtonText>Back</ButtonText>
        </Button>
        <View style={styles.continueButtonContainer}>
          <Button
            disabled={loading}
            onPress={async () => {
              await saveSettings(false);
            }}
            variant="ghost">
            <ButtonText>Skip Biometrics</ButtonText>
          </Button>
          <Button
            disabled={loading || enrolledStatus !== 'enrolled'}
            onPress={async () => {
              await saveSettings(true);
            }}
            variant="solid">
            <ButtonText>Enable Biometrics</ButtonText>
          </Button>
        </View>
      </OnboardingActions>
    </OnboardingShell>
  );
};

const stylesheet = createStyleSheet(() => ({
  continueButtonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'column',
    gap: 12,
  },
  notEnrolledContainer: {
    gap: 12,
  },
  openSettingsContainer: {
    alignItems: 'flex-end',
  },
}));

export default OnboardingBiometricsScreen;

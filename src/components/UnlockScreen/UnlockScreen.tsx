import React, {
  Fragment,
  FunctionComponent,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import {View} from 'react-native';

import usePublicSettings from '../../hooks/usePublicSettings';
import useSecureSettingsStore from '../../stores/useSecureSettingsStore';
import openKdbxDatabase from '../../utilities/kdbx/openKdbxDatabase';
import retrieveSecureSettings from '../../utilities/retrieveSecureSettings';
import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import ErrorBox from '../ErrorBox';
import FormGroup from '../FormGroup';
import FormTextInput from '../FormTextInput';
import Heading from '../Heading';
import OnboardingActions from '../OnboardingActions';
import OnboardingContent from '../OnboardingContent';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';

const UnlockScreen: FunctionComponent = () => {
  const settings = usePublicSettings();
  const unlock = useSecureSettingsStore(state => state.unlock);

  const [loading, setLoading] = useState(false);
  const [generalError, setGeneralError] = useState<unknown>();
  const [masterPassword, setMasterPassword] = useState('');
  const [masterPasswordError, setMasterPasswordError] = useState<string>();
  const [unlockMethod, setUnlockMethod] = useState<'password' | 'biometrics'>(
    settings.biometricsEnabled ? 'biometrics' : 'password',
  );

  const onToggleMethod = useCallback(() => {
    setUnlockMethod(method =>
      method === 'password' ? 'biometrics' : 'password',
    );
  }, []);

  const onUnlock = useCallback(async () => {
    setLoading(true);
    setGeneralError(undefined);
    setMasterPasswordError(undefined);

    try {
      if (unlockMethod === 'biometrics') {
        const secureSettings = await retrieveSecureSettings();

        const result = await openKdbxDatabase(
          settings.storage.file,
          Uint8Array.from(secureSettings.compositeKey),
        );

        unlock(result.file, secureSettings);
      } else {
        const result = await openKdbxDatabase(
          settings.storage.file,
          masterPassword,
        );

        unlock(result.file, {
          compositeKey: Array.from(result.compositeKey),
          masterPassword,
          settingsVersion: 1,
        });
      }
    } catch (error) {
      if (error instanceof Error && error.message === 'HMAC mismatch') {
        setMasterPasswordError(`Unable to unlock database. ${error.message}.`);
      } else {
        setGeneralError(error);
      }
    } finally {
      setLoading(false);
    }
  }, [masterPassword, settings, unlock, unlockMethod]);

  const isUnlockDisabled = useMemo(() => {
    if (unlockMethod === 'password') {
      return masterPassword.length < 1;
    }

    return false;
  }, [masterPassword, unlockMethod]);

  useEffect(() => {
    setGeneralError(undefined);
    setMasterPasswordError(undefined);
  }, [masterPassword]);

  return (
    <OnboardingShell>
      <OnboardingContent>
        <Heading>
          {unlockMethod === 'password'
            ? 'Unlock with Password'
            : 'Unlock with Biometrics'}
        </Heading>

        {unlockMethod === 'password' ? (
          <Paragraph>
            Enter your database's master password to unlock your authenticators.
          </Paragraph>
        ) : (
          <Paragraph>
            Your database master password was stored securely and can be
            unlocked using biometrics.
          </Paragraph>
        )}

        {generalError !== undefined && <ErrorBox error={generalError} />}

        {unlockMethod === 'password' && (
          <Fragment>
            <FormGroup label="Master Password" error={masterPasswordError}>
              <FormTextInput
                onChangeText={setMasterPassword}
                onSubmitEditing={onUnlock}
                secureTextEntry
                value={masterPassword}
              />
            </FormGroup>
          </Fragment>
        )}
      </OnboardingContent>
      <OnboardingActions>
        {settings.biometricsEnabled ? (
          <Button disabled={loading} onPress={onToggleMethod} variant="ghost">
            <ButtonText>
              {unlockMethod === 'password' ? 'Use Biometrics' : 'Use Password'}
            </ButtonText>
          </Button>
        ) : (
          <View />
        )}
        <Button
          disabled={loading || isUnlockDisabled}
          onPress={onUnlock}
          variant="solid">
          <ButtonText>Unlock</ButtonText>
        </Button>
      </OnboardingActions>
    </OnboardingShell>
  );
};

export default UnlockScreen;

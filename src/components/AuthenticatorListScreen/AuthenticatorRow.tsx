import Clipboard from '@react-native-clipboard/clipboard';
import React, {useMemo} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import useAuthenticatorDeleteMutation from '../../hooks/useAuthenticatorDeleteMutation';
import {Authenticator} from '../../parsers/authenticatorParser';
import {useCurrentTime} from '../../stores/useCurrentTimeStore';
import generateTotp from '../../utilities/generateTotp';
import CountdownBar from '../CountdownBar';
import AuthenticatorIcon from './AuthenticatorIcon';
import TotpCode from './TotpCode';

function getNextIncrement(
  currentTimeInMilliseconds: number,
  timeStepInSeconds: number,
) {
  const timeStepInMilliseconds = timeStepInSeconds * 1000;
  return (
    timeStepInMilliseconds -
    (currentTimeInMilliseconds % timeStepInMilliseconds)
  );
}

type AuthenticatorRowProps = {
  authenticator: Authenticator;
};

const AuthenticatorRow: React.FunctionComponent<AuthenticatorRowProps> = ({
  authenticator,
}) => {
  const currentTime = useCurrentTime();
  const {mutateAsync: deleteAuthenticator} = useAuthenticatorDeleteMutation();

  const totpChangeTime = useMemo(() => {
    return currentTime + getNextIncrement(currentTime, authenticator.timeStep);
  }, [authenticator, currentTime]);

  const totp = useMemo(
    () =>
      generateTotp(
        authenticator.secret,
        authenticator.algorithm,
        authenticator.timeStep,
        authenticator.codeSize,
        authenticator.initialTime,
        Math.floor(currentTime / 1000),
      ),
    [authenticator, currentTime],
  );

  /*const nextTotp = useMemo(
    () =>
      generateTotp(
        authenticator.secret,
        authenticator.algorithm,
        authenticator.timeStep,
        authenticator.codeSize,
        authenticator.initialTime,
        Math.floor((currentTime + authenticator.timeStep * 1000) / 1000),
      ),
    [authenticator, currentTime],
  );*/

  function handleCopy() {
    Clipboard.setString(totp);
  }

  function handleRemove() {
    Alert.alert(
      'Remove Authenticator',
      `Are you sure you want to remove ${authenticator.issuer} from your authenticators?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            void deleteAuthenticator(authenticator.id);
          },
        },
      ],
    );
  }

  return (
    <Pressable
      style={rowStyleGenerator}
      onPress={handleCopy}
      onLongPress={handleRemove}>
      <View style={rowStyles.icon}>
        <AuthenticatorIcon issuer={authenticator.issuer} />
      </View>
      <View style={rowStyles.info}>
        <View style={rowStyles.name}>
          <Text style={rowStyles.issuer}>{authenticator.issuer}</Text>
          {authenticator.username && (
            <Text style={rowStyles.username}>({authenticator.username})</Text>
          )}
        </View>
        <View style={rowStyles.codeContainer}>
          <View style={rowStyles.codePreviewContainer}>
            <View>
              <TotpCode
                code={totp}
                containerStyle={rowStyles.codePartsContainer}
                textStyle={rowStyles.code}
              />
              <View style={rowStyles.codeProgress}>
                <CountdownBar
                  duration={authenticator.timeStep * 1000}
                  endTime={totpChangeTime}
                />
              </View>
            </View>
            {/*<Text>&mdash;</Text>
            <TotpCode
              code={nextTotp}
              containerStyle={rowStyles.codePartsContainer}
              textStyle={rowStyles.codePreview}
            />*/}
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const rowStyles = StyleSheet.create({
  code: {
    color: '#111827',
    fontSize: 20,
    fontWeight: 'semibold',
  },
  codeContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'column',
    display: 'flex',
  },
  codePartsContainer: {
    flexDirection: 'row',
    display: 'flex',
    flexShrink: 1,
    gap: 4,
  },
  codePreview: {
    color: '#9ca3af',
    fontSize: 20,
    fontWeight: 'semibold',
  },
  codePreviewContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    display: 'flex',
  },
  codeProgress: {
    height: 4,
    borderRadius: 4,
  },
  icon: {
    paddingTop: 4,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: 2,
  },
  issuer: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  name: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
  },
  root: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  username: {
    color: '#4b5563',
    flexGrow: 1,
    fontSize: 12,
  },
});

function rowStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    ...rowStyles.root,
    backgroundColor: pressed ? '#e5e7eb' : '#f3f4f6',
  };
}

export default AuthenticatorRow;

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

  const totpParts =
    totp.length % 2 === 0
      ? [totp.slice(0, totp.length / 2), totp.slice(totp.length / 2)]
      : [totp];

  function handleCopy() {
    Clipboard.setString(totp);
  }

  async function handleRemove() {
    await deleteAuthenticator(authenticator.id);
  }

  return (
    <Pressable
      style={rowStyleGenerator}
      onPress={handleCopy}
      onLongPress={() => void handleRemove()}>
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
          {totpParts.map((part, index) => (
            <Text key={`${part}-${index.toString()}`} style={rowStyles.code}>
              {part}
            </Text>
          ))}
        </View>
      </View>
      <View style={rowStyles.progress}>
        <CountdownBar
          duration={authenticator.timeStep * 1000}
          endTime={totpChangeTime}
        />
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
    flexDirection: 'row',
    display: 'flex',
    flexShrink: 1,
    gap: 4,
  },
  icon: {
    alignSelf: 'flex-start',
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
  progress: {
    bottom: 0,
    height: 2,
    left: 0,
    position: 'absolute',
    right: 0,
  },
  root: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  username: {
    color: '#9ca3af',
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

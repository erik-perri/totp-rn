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
import AuthenticatorIcon from './AuthenticatorIcon';

function getNextIncrement(currentTime: number, timeStep: number): number {
  return timeStep - (currentTime % timeStep);
}

type AuthenticatorRowProps = {
  authenticator: Authenticator;
};

const AuthenticatorRow: React.FunctionComponent<AuthenticatorRowProps> = ({
  authenticator,
}) => {
  const currentTime = useCurrentTime();
  const {mutateAsync: deleteAuthenticator} = useAuthenticatorDeleteMutation();

  const timeRemaining = useMemo(() => {
    return getNextIncrement(currentTime, authenticator.timeStep);
  }, [authenticator, currentTime]);

  const totp = useMemo(
    () =>
      generateTotp(
        authenticator.secret,
        authenticator.algorithm,
        authenticator.timeStep,
        authenticator.codeSize,
        authenticator.initialTime,
        currentTime,
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
            <Text style={rowStyles.username}>{authenticator.username}</Text>
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
      <Text style={rowStyles.remaining}>{timeRemaining}</Text>
    </Pressable>
  );
};

const rowStyles = StyleSheet.create({
  code: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  codeContainer: {
    flexDirection: 'row',
    display: 'flex',
    flexShrink: 1,
    gap: 4,
  },
  icon: {
    alignSelf: 'flex-start',
    paddingTop: 8,
  },
  info: {
    color: '#000000',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: 2,
  },
  issuer: {
    flexGrow: 1,
    fontSize: 20,
    fontWeight: 'semibold',
  },
  name: {
    display: 'flex',
    flexDirection: 'column',
  },
  remaining: {
    color: '#9ca3af',
    flexShrink: 1,
    minWidth: 20,
    textAlign: 'right',
  },
  root: {
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  username: {
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

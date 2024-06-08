import React, {Fragment, useMemo} from 'react';
import {StyleSheet, Text, View} from 'react-native';

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
  const timeRemaining = useMemo(() => {
    return getNextIncrement(currentTime, authenticator.timeStep);
  }, [authenticator, currentTime]);

  const totp = generateTotp(
    authenticator.secret,
    authenticator.algorithm,
    authenticator.timeStep,
    authenticator.codeSize,
    authenticator.initialTime,
    currentTime,
  );

  const [partA, partB] = [
    totp.slice(0, totp.length / 2),
    totp.slice(totp.length / 2),
  ];

  return (
    <View style={rowStyles.root}>
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
        <Text style={rowStyles.code}>
          {totp.length % 2 === 0 ? (
            <Fragment>
              <Text>{partA}</Text>
              <Text> </Text>
              <Text>{partB}</Text>
            </Fragment>
          ) : (
            <Text>{totp}</Text>
          )}
        </Text>
      </View>
      <Text style={rowStyles.remaining}>{timeRemaining}</Text>
    </View>
  );
};

const rowStyles = StyleSheet.create({
  code: {
    flexShrink: 1,
    fontSize: 20,
    fontWeight: 'bold',
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

export default AuthenticatorRow;

import React, {Fragment, useEffect} from 'react';
import {Authenticator} from '../../parsers/authenticatorParser';
import generateTotp from '../../utilities/generateTotp';
import {StyleSheet, Text, View} from 'react-native';

function getNextIncrement(timeStep: number): number {
  const currentTime = Math.floor(Date.now() / 1000);
  return timeStep - (currentTime % timeStep);
}

type AuthenticatorRowProps = {
  authenticator: Authenticator;
};

const AuthenticatorRow: React.FunctionComponent<AuthenticatorRowProps> = ({
  authenticator,
}) => {
  const [timeRemaining, setTimeRemaining] = React.useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining(getNextIncrement(authenticator.timeStep));
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [authenticator.timeStep]);

  const totp = generateTotp(
    authenticator.secret,
    authenticator.algorithm,
    authenticator.timeStep,
    authenticator.codeSize,
    authenticator.initialTime,
    Date.now() / 1000,
  );

  const [partA, partB] = [
    totp.slice(0, totp.length / 2),
    totp.slice(totp.length / 2),
  ];

  return (
    <View style={rowStyles.root}>
      <Text style={rowStyles.name}>{authenticator.name}</Text>
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
      <Text style={rowStyles.remaining}>{timeRemaining}</Text>
    </View>
  );
};

const rowStyles = StyleSheet.create({
  root: {
    alignItems: 'center',
    borderColor: '#9ca3af',
    borderRadius: 4,
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'semibold',
  },
  code: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  remaining: {
    color: '#9ca3af',
  },
});

export default AuthenticatorRow;

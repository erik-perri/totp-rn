import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';

import TotpAlgorithm from '../../enums/TotpAlgorithm';
import useAuthenticatorCreateMutation from '../../hooks/useAuthenticatorCreateMutation';
import AuthenticatorList from './AuthenticatorList';
import AuthenticatorListHeader from './AuthenticatorListHeader';

const mockAuthenticators = [
  {
    algorithm: TotpAlgorithm.Sha1,
    codeSize: 6,
    initialTime: 0,
    issuer: 'Google',
    secret: 'TESTING',
    timeStep: 30,
    username: 'TESTING Sha1 30',
  },
  {
    algorithm: TotpAlgorithm.Sha1,
    codeSize: 6,
    initialTime: 0,
    issuer: 'Microsoft',
    secret: 'TESTING',
    timeStep: 60,
    username: 'TESTING Sha1 60',
  },
  {
    algorithm: TotpAlgorithm.Sha256,
    codeSize: 6,
    initialTime: 0,
    issuer: 'Github',
    secret: 'TESTING',
    timeStep: 30,
    username: 'TESTING Sha256 30',
  },
  {
    algorithm: TotpAlgorithm.Sha256,
    codeSize: 6,
    id: '4',
    initialTime: 0,
    issuer: 'NPM',
    secret: 'TESTING',
    timeStep: 60,
    username: 'TESTING Sha256 60',
  },
  {
    algorithm: TotpAlgorithm.Sha512,
    codeSize: 6,
    id: '5',
    initialTime: 0,
    issuer: 'Paypal',
    secret: 'TESTING',
    timeStep: 30,
    username: 'TESTING Sha512 30',
  },
  {
    algorithm: TotpAlgorithm.Sha512,
    codeSize: 6,
    id: '6',
    initialTime: 0,
    issuer: 'Testing',
    secret: 'TESTING',
    timeStep: 60,
    username: 'TESTING Sha512 60',
  },
];

const AuthenticatorListScreen: FunctionComponent = () => {
  const {mutateAsync: addAuthenticator} = useAuthenticatorCreateMutation();

  const handleNewAuthenticator = async () => {
    const newAuthenticator =
      mockAuthenticators[Math.floor(Math.random() * mockAuthenticators.length)];

    await addAuthenticator({
      ...newAuthenticator,
      id: Math.random().toString(36).substring(7),
    });
  };

  return (
    <View style={screenStyles.root}>
      <AuthenticatorListHeader onNewAuthenticator={handleNewAuthenticator} />
      <AuthenticatorList />
    </View>
  );
};

const screenStyles = StyleSheet.create({
  root: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
});

export default AuthenticatorListScreen;

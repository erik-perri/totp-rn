import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import AuthenticatorLinkHeader from './AuthenticatorLinkHeader';
import AuthenticatorList from './AuthenticatorList';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Authenticator} from '../../parsers/authenticatorParser';
import TotpAlgorithm from '../../enums/TotpAlgorithm';
import {useQueryClient} from '@tanstack/react-query';

const AuthenticatorListScreen: FunctionComponent = () => {
  const queryClient = useQueryClient();

  const handleNewAuthenticator = async () => {
    const mockAuthenticators: Authenticator[] = [
      {
        algorithm: TotpAlgorithm.Sha1,
        codeSize: 6,
        icon: 'test',
        id: '1',
        initialTime: 0,
        issuer: 'Google',
        secret: 'TESTING',
        timeStep: 30,
        username: 'TESTING Sha1 30',
      },
      {
        algorithm: TotpAlgorithm.Sha1,
        codeSize: 6,
        icon: 'test',
        id: '2',
        initialTime: 0,
        issuer: 'Microsoft',
        secret: 'TESTING',
        timeStep: 60,
        username: 'TESTING Sha1 60',
      },
      {
        algorithm: TotpAlgorithm.Sha256,
        codeSize: 6,
        icon: 'test',
        id: '3',
        initialTime: 0,
        issuer: 'Github',
        secret: 'TESTING',
        timeStep: 30,
        username: 'TESTING Sha256 30',
      },
      {
        algorithm: TotpAlgorithm.Sha256,
        codeSize: 6,
        icon: 'test',
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
        icon: 'test',
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
        icon: 'test',
        id: '6',
        initialTime: 0,
        issuer: 'Testing',
        secret: 'TESTING',
        timeStep: 60,
        username: 'TESTING Sha512 60',
      },
    ];

    mockAuthenticators.sort(() => Math.random() - 0.5);

    await AsyncStorage.setItem(
      'authenticators',
      JSON.stringify(mockAuthenticators),
    );

    await queryClient.invalidateQueries({
      queryKey: ['authenticators'],
    });
  };

  return (
    <View style={screenStyles.root}>
      <AuthenticatorLinkHeader onNewAuthenticator={handleNewAuthenticator} />
      <ScrollView contentContainerStyle={screenStyles.list}>
        <AuthenticatorList />
      </ScrollView>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  list: {
    backgroundColor: '#ffffff',
    flexGrow: 1,
  },
  root: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
});

export default AuthenticatorListScreen;

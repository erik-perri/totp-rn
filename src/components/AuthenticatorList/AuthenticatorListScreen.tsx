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
    await AsyncStorage.setItem(
      'authenticators',
      JSON.stringify([
        {
          algorithm: TotpAlgorithm.Sha1,
          codeSize: 6,
          icon: 'microsoft',
          id: '1',
          initialTime: 0,
          name: 'Microsoft',
          secret: 'TESTING',
          timeStep: 30,
        },
      ] satisfies Authenticator[]),
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

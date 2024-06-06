import React, {FunctionComponent} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import AuthenticatorLinkHeader from './AuthenticatorLinkHeader.tsx';

const AuthenticatorListScreen: FunctionComponent = () => {
  return (
    <View style={screenStyles.root}>
      <AuthenticatorLinkHeader onNewAuthenticator={async () => {}} />
      <ScrollView contentContainerStyle={screenStyles.list}>
        <Text>Authenticator list here.</Text>
      </ScrollView>
    </View>
  );
};

const screenStyles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: 'white',
  },
  list: {
    backgroundColor: '#f9fafb',
    flexGrow: 1,
  },
});

export default AuthenticatorListScreen;

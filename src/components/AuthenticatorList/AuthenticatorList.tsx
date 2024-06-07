import React, {FunctionComponent} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import useAuthenticatorListQuery from '../../hooks/useAuthenticatorListQuery';
import AuthenticatorRow from './AuthenticatorRow';

const AuthenticatorList: FunctionComponent = () => {
  const {data, error} = useAuthenticatorListQuery();

  if (error) {
    return (
      <View style={listStyles.empty}>
        <Text style={listStyles.errorText}>
          Failed to load authenticators from storage.
        </Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={listStyles.empty}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={listStyles.empty}>
        <Text style={listStyles.emptyText}>No authenticators found.</Text>
      </View>
    );
  }

  return (
    <View style={listStyles.root}>
      {data.map(authenticator => {
        return (
          <AuthenticatorRow
            key={authenticator.id}
            authenticator={authenticator}
          />
        );
      })}
    </View>
  );
};

const listStyles = StyleSheet.create({
  root: {
    gap: 8,
    padding: 16,
  },
  empty: {
    alignItems: 'center',
    color: '#9ca3af',
    display: 'flex',
    flex: 1,
    fontSize: 24,
    justifyContent: 'center',
  },
  errorText: {
    color: '#991b1b',
    fontSize: 18,
  },
  loadingText: {
    color: 'black',
    fontSize: 24,
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 18,
  },
});

export default AuthenticatorList;

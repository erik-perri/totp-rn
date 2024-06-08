import {FlashList} from '@shopify/flash-list';
import React, {FunctionComponent} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';

import useAuthenticatorListQuery from '../../hooks/useAuthenticatorListQuery';
import AuthenticatorRow from './AuthenticatorRow';

const ListSeparator: FunctionComponent = () => (
  <View style={listStyles.separator} />
);

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
    <FlashList
      ItemSeparatorComponent={ListSeparator}
      contentContainerStyle={listStyles.root}
      data={data}
      estimatedItemSize={90}
      getItemType={() => 'authenticator'}
      renderItem={({item}) => <AuthenticatorRow authenticator={item} />}
    />
  );
};

const listStyles = StyleSheet.create({
  empty: {
    alignItems: 'center',
    color: '#9ca3af',
    display: 'flex',
    flex: 1,
    fontSize: 24,
    justifyContent: 'center',
  },
  emptyText: {
    color: '#9ca3af',
    fontSize: 18,
  },
  errorText: {
    color: '#991b1b',
    fontSize: 18,
  },
  loadingText: {
    color: 'black',
    fontSize: 24,
  },
  root: {
    padding: 12,
  },
  separator: {
    height: 12,
  },
});

export default AuthenticatorList;

import {FlashList} from '@shopify/flash-list';
import React, {FunctionComponent, useCallback} from 'react';
import {ActivityIndicator, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useAuthenticatorListQuery from '../../hooks/useAuthenticatorListQuery';
import AlertBox from '../AlertBox';
import AuthenticatorRow from './AuthenticatorRow';

const AuthenticatorList: FunctionComponent = () => {
  const {styles} = useStyles(stylesheet);
  const {data, error} = useAuthenticatorListQuery();

  const ListSeparator: FunctionComponent = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  if (error) {
    return (
      <View style={styles.empty}>
        <AlertBox
          message="Failed to load authenticators from storage."
          theme="error"
        />
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.empty}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (!data.length) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No authenticators found.</Text>
      </View>
    );
  }

  return (
    <FlashList
      ItemSeparatorComponent={ListSeparator}
      contentContainerStyle={styles.root}
      data={data}
      estimatedItemSize={90}
      getItemType={() => 'authenticator'}
      renderItem={({item}) => <AuthenticatorRow authenticator={item} />}
    />
  );
};

const stylesheet = createStyleSheet(theme => ({
  empty: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },
  emptyText: {
    color: theme.colors.textAlt,
    fontSize: theme.fontSize.lg,
  },
  root: {
    padding: 12,
  },
  separator: {
    height: 12,
  },
}));

export default AuthenticatorList;

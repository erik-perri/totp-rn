import {FlashList} from '@shopify/flash-list';
import React, {FunctionComponent, useCallback} from 'react';
import {Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useAuthenticatorList from '../../hooks/useAuthenticatorList';
import AuthenticatorRow from './AuthenticatorRow';

const AuthenticatorList: FunctionComponent = () => {
  const {styles} = useStyles(stylesheet);

  const authenticators = useAuthenticatorList();

  const ListSeparator: FunctionComponent = useCallback(
    () => <View style={styles.separator} />,
    [styles.separator],
  );

  // TODO Error and loading states

  if (!authenticators.length) {
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
      data={authenticators}
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

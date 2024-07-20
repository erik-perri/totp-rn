import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import Button from '../Button/Button';
import ButtonIcon from '../Button/ButtonIcon';

type AuthenticatorListHeaderProps = {
  onNewAuthenticator: () => void;
};

const AuthenticatorListHeader: FunctionComponent<
  AuthenticatorListHeaderProps
> = ({onNewAuthenticator}) => {
  const {styles} = useStyles(stylesheet);
  const {top} = useSafeAreaInsets();

  return (
    <View style={[styles.root, {marginTop: top}]}>
      <Button onPress={onNewAuthenticator} theme="ghost">
        <ButtonIcon icon={faPlus} />
      </Button>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  root: {
    alignItems: 'flex-end',
    backgroundColor: theme.colors.header.background,
    borderBottomColor: theme.colors.header.border,
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
  },
}));

export default AuthenticatorListHeader;

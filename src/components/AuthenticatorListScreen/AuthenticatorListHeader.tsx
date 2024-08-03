import {faPlus} from '@fortawesome/free-solid-svg-icons';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
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

  return (
    <View style={[styles.root]}>
      <Button onPress={onNewAuthenticator} variant="ghost">
        <ButtonIcon icon={faPlus} />
      </Button>
    </View>
  );
};

const stylesheet = createStyleSheet((theme, runtime) => ({
  root: {
    alignItems: 'flex-end',
    backgroundColor: theme.colors.header.background,
    borderBottomColor: theme.colors.header.border,
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: runtime.insets.top,
    padding: 8,
  },
}));

export default AuthenticatorListHeader;

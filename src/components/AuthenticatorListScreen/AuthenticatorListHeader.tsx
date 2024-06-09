import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type AuthenticatorListHeaderProps = {
  onNewAuthenticator: () => Promise<void>;
};

const AuthenticatorListHeader: FunctionComponent<
  AuthenticatorListHeaderProps
> = ({onNewAuthenticator}) => {
  const {top} = useSafeAreaInsets();
  return (
    <View style={[headerStyles.root, {marginTop: top}]}>
      <Pressable
        accessibilityHint="Add new authenticator"
        onPress={() => {
          void onNewAuthenticator();
        }}
        style={buttonStyleGenerator}>
        <FontAwesomeIcon icon={faPlus} />
      </Pressable>
    </View>
  );
};

const headerStyles = StyleSheet.create({
  root: {
    alignItems: 'flex-end',
    backgroundColor: '#f9fafb',
    borderBottomColor: '#9ca3af',
    borderBottomWidth: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    padding: 8,
  },
});

function buttonStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    backgroundColor: pressed ? '#f3f4f6' : 'transparent',
    borderRadius: 8,
    padding: 8,
  };
}

export default AuthenticatorListHeader;

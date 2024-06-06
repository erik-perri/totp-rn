import React, {FunctionComponent} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  View,
} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faPlus} from '@fortawesome/free-solid-svg-icons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

type HeaderProps = {
  onNewAuthenticator: () => Promise<void>;
};

const AuthenticatorLinkHeader: FunctionComponent<HeaderProps> = ({
  onNewAuthenticator,
}) => {
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
    backgroundColor: 'white',
    borderBottomColor: '#9ca3af',
    borderBottomWidth: 1,
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    padding: 10,
  },
});

function buttonStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    backgroundColor: pressed ? '#f3f4f6' : 'white',
    borderRadius: 5,
    padding: 10,
  };
}

export default AuthenticatorLinkHeader;

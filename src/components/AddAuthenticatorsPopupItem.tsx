import {faSquare, faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import {AuthenticatorWithoutId} from '../parsers/authenticatorParser';
import AuthenticatorIcon from './AuthenticatorListScreen/AuthenticatorIcon';

type AddAuthenticatorsPopupItemProps = {
  authenticator: AuthenticatorWithoutId;
  canCheck: boolean;
  isChecked: boolean;
  onPress: () => void;
};

const AddAuthenticatorsPopupItem: FunctionComponent<
  AddAuthenticatorsPopupItemProps
> = ({authenticator, canCheck, isChecked, onPress}) => {
  return (
    <Pressable
      disabled={!canCheck}
      style={itemStyleGenerator}
      onPress={onPress}>
      <View style={styles.icon}>
        <AuthenticatorIcon issuer={authenticator.issuer} />
      </View>
      <View style={styles.info}>
        <View style={styles.name}>
          <Text style={styles.issuer}>{authenticator.issuer}</Text>
          {authenticator.username && (
            <Text style={styles.username}>({authenticator.username})</Text>
          )}
        </View>
      </View>
      {canCheck && (
        <View style={styles.checkContainer}>
          <FontAwesomeIcon
            icon={isChecked ? faSquareCheck : faSquare}
            size={20}
          />
        </View>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  checkContainer: {
    //
  },
  icon: {
    alignSelf: 'flex-start',
    paddingTop: 4,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: 2,
  },
  issuer: {
    color: '#111827',
    fontSize: 16,
    fontWeight: 'semibold',
  },
  name: {
    alignItems: 'baseline',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    justifyContent: 'flex-start',
  },
  root: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
    overflow: 'hidden',
    padding: 12,
  },
  username: {
    color: '#9ca3af',
    flexGrow: 1,
    fontSize: 12,
  },
});

function itemStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    ...styles.root,
    backgroundColor: pressed ? '#f3f4f6' : 'transparent',
  };
}

export default AddAuthenticatorsPopupItem;

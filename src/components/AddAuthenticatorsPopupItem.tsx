import {faSquare, faSquareCheck} from '@fortawesome/free-regular-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {Pressable, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

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
  const {styles} = useStyles(stylesheet);

  return (
    <Pressable disabled={!canCheck} onPress={onPress}>
      {({pressed}) => (
        <View style={[styles.root, pressed && styles.rootPressed]}>
          <View style={styles.iconContainer}>
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
                style={styles.icon}
              />
            </View>
          )}
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(theme => ({
  checkContainer: {
    //
  },
  iconContainer: {
    alignSelf: 'flex-start',
    paddingTop: 4,
  },
  icon: {
    color: theme.colors.text,
  },
  info: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    gap: 2,
  },
  issuer: {
    color: theme.colors.text,
    fontSize: theme.fontSize.base,
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
  rootPressed: {
    backgroundColor: theme.colors.authenticatorRow.pressed.background,
  },
  username: {
    color: theme.colors.textAlt,
    flexGrow: 1,
    fontSize: theme.fontSize.md,
  },
}));

export default AddAuthenticatorsPopupItem;

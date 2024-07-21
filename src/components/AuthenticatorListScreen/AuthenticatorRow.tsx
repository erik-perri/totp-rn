import Clipboard from '@react-native-clipboard/clipboard';
import React, {Fragment, useMemo} from 'react';
import {Alert, Pressable, Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useAuthenticatorDeleteMutation from '../../hooks/useAuthenticatorDeleteMutation';
import {Authenticator} from '../../parsers/authenticatorParser';
import {useCurrentTime} from '../../stores/useCurrentTimeStore';
import generateTotp from '../../utilities/generateTotp';
import getNextTotpTime from '../../utilities/getNextTotpTime';
import CountdownBar from '../CountdownBar';
import AuthenticatorIcon from './AuthenticatorIcon';
import TotpCode from './TotpCode';

type AuthenticatorRowProps = {
  authenticator: Authenticator;
  showNextCode?: boolean;
};

const AuthenticatorRow: React.FunctionComponent<AuthenticatorRowProps> = ({
  authenticator,
  showNextCode,
}) => {
  const {styles} = useStyles(stylesheet);
  const currentTime = useCurrentTime();
  const {mutateAsync: deleteAuthenticator} = useAuthenticatorDeleteMutation();

  const totpChangeTime = useMemo(
    () => getNextTotpTime(currentTime, authenticator.timeStep),
    [authenticator, currentTime],
  );

  const totp = useMemo(
    () =>
      generateTotp(
        authenticator.secret,
        authenticator.algorithm,
        authenticator.timeStep,
        authenticator.codeSize,
        authenticator.initialTime,
        Math.floor(currentTime / 1000),
      ),
    [authenticator, currentTime],
  );

  const nextTotp = useMemo(
    () =>
      generateTotp(
        authenticator.secret,
        authenticator.algorithm,
        authenticator.timeStep,
        authenticator.codeSize,
        authenticator.initialTime,
        Math.floor((currentTime + authenticator.timeStep * 1000) / 1000),
      ),
    [authenticator, currentTime],
  );

  function handleCopy() {
    Clipboard.setString(totp);
  }

  function handleRemove() {
    Alert.alert(
      'Remove Authenticator',
      `Are you sure you want to remove "${authenticator.issuer}" from your authenticators?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            void deleteAuthenticator(authenticator.id);
          },
        },
      ],
    );
  }

  return (
    <Pressable onPress={handleCopy} onLongPress={handleRemove}>
      {({pressed}) => (
        <View style={[styles.root, pressed && styles.rootPressed]}>
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
            <View style={styles.codeContainer}>
              <View style={styles.codePreviewContainer}>
                <View>
                  <TotpCode
                    code={totp}
                    containerStyle={styles.codePartsContainer}
                    textStyle={styles.code}
                  />
                  <View style={styles.codeProgress}>
                    <CountdownBar
                      duration={authenticator.timeStep * 1000}
                      endTime={totpChangeTime}
                    />
                  </View>
                </View>
                {showNextCode && (
                  <Fragment>
                    <Text>&mdash;</Text>
                    <TotpCode
                      code={nextTotp}
                      containerStyle={styles.codePartsContainer}
                      textStyle={styles.codePreview}
                    />
                  </Fragment>
                )}
              </View>
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(theme => ({
  code: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: 'semibold',
  },
  codeContainer: {
    alignSelf: 'flex-start',
    display: 'flex',
    flexDirection: 'column',
  },
  codePartsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexShrink: 1,
    gap: 4,
  },
  codePreview: {
    color: theme.colors.textAlt,
    fontSize: theme.fontSize.lg,
    fontWeight: 'semibold',
  },
  codePreviewContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'row',
    gap: 8,
  },
  codeProgress: {
    borderRadius: 9999,
    height: 2,
  },
  icon: {
    //
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
    backgroundColor: theme.colors.authenticatorRow.base.background,
    borderRadius: 8,
    display: 'flex',
    flexDirection: 'row',
    gap: 12,
    justifyContent: 'space-between',
    overflow: 'hidden',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  rootPressed: {
    backgroundColor: theme.colors.authenticatorRow.pressed.background,
  },
  username: {
    color: theme.colors.textAlt,
    flexGrow: 1,
    fontSize: theme.fontSize.sm,
  },
}));

export default AuthenticatorRow;

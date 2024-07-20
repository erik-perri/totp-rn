import {faQrcode} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useCallback, useState} from 'react';
import {Alert, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {useCameraPermission} from 'react-native-vision-camera';

import {MainStackParamList} from '../MainStack';
import MenuPopup from '../MenuPopup';
import MenuPopupItem from '../MenuPopupItem';
import AuthenticatorList from './AuthenticatorList';
import AuthenticatorListHeader from './AuthenticatorListHeader';

const AuthenticatorListScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'AuthenticatorList'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);
  const [isSelectingAddType, setIsSelectingAddType] = useState(false);
  const {hasPermission, requestPermission} = useCameraPermission();

  const handleScanQrCode = useCallback(async () => {
    if (!hasPermission) {
      const receivedPermission = await requestPermission();
      if (!receivedPermission) {
        Alert.alert(
          'Permission denied',
          'You need to grant camera permission to add authenticators with QR codes.',
        );
        return;
      }
    }

    setIsSelectingAddType(false);
    navigation.navigate('QrCodeScanner');
  }, [hasPermission, navigation, requestPermission]);

  return (
    <View style={styles.root}>
      <AuthenticatorListHeader
        onNewAuthenticator={() => {
          setIsSelectingAddType(true);
        }}
      />
      <AuthenticatorList />
      <MenuPopup
        isOpen={isSelectingAddType}
        onClose={() => {
          setIsSelectingAddType(false);
        }}>
        <MenuPopupItem
          icon={faQrcode}
          label="Scan QR Code"
          onPress={() => void handleScanQrCode()}
        />
      </MenuPopup>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  root: {
    backgroundColor: theme.colors.background,
    flex: 1,
  },
}));

export default AuthenticatorListScreen;

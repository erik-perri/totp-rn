import {faSun} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faArrowsRotate,
  faSun as faSolidSun,
} from '@fortawesome/free-solid-svg-icons';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';
import {
  Camera,
  CameraPosition,
  useCameraDevice,
  useCameraPermission,
  useCodeScanner,
} from 'react-native-vision-camera';

import useAuthenticatorsCreateMutation from '../../hooks/useAuthenticatorsCreateMutation';
import {AuthenticatorWithoutId} from '../../parsers/authenticatorParser';
import findAuthenticatorInCodes from '../../utilities/findAuthenticatorInCodes';
import AddAuthenticatorsPopup from '../AddAuthenticatorsPopup';
import {MainStackParamList} from '../MainStack';
import CameraButton from './CameraButton';

const QrCodeScannerScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'QrCodeScanner'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);
  const [devicePosition, setDevicePosition] = useState<CameraPosition>('back');
  const [torch, setTorch] = useState<'off' | 'on'>('off');

  const device = useCameraDevice(devicePosition);
  const {hasPermission} = useCameraPermission();

  const insets = useSafeAreaInsets();
  const positionStyles = useMemo(
    () =>
      StyleSheet.create({
        help: {
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        left: {
          left: insets.left + 16,
          top: insets.top + 16,
        },
        right: {
          right: insets.right + 16,
          top: insets.top + 16,
        },
      }),
    [insets],
  );

  const [potentialAuthenticators, setPotentialAuthenticators] = useState<
    AuthenticatorWithoutId[]
  >([]);
  const [codeScanningEnabled, setCodeScanningEnabled] = useState(true);
  const codeScanner = useCodeScanner({
    codeTypes: ['qr'],
    onCodeScanned: codes => {
      // Since code scanning is continuous, we disable it while we process a
      // scanned code. That way we can abort without having multiple potential
      // callbacks queued up.
      setCodeScanningEnabled(false);

      const authenticators = findAuthenticatorInCodes(codes);

      if (authenticators.length) {
        setPotentialAuthenticators(authenticators);
      } else {
        setCodeScanningEnabled(true);
      }
    },
  });

  const clearPotentialAuthenticators = useCallback(() => {
    setPotentialAuthenticators([]);
    setCodeScanningEnabled(true);
  }, []);

  const {mutateAsync: createAuthenticators} = useAuthenticatorsCreateMutation();
  const handleSave = useCallback(
    async (enabledAuthenticators: AuthenticatorWithoutId[]) => {
      await createAuthenticators(enabledAuthenticators);
      navigation.goBack();
    },
    [createAuthenticators, navigation],
  );

  if (!hasPermission) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorHeading}>Camera permission not available</Text>
        <Text style={styles.errorText}>Why are you here?</Text>
      </View>
    );
  }

  if (!device) {
    return (
      <View style={styles.root}>
        <Text style={styles.errorHeading}>Camera not available</Text>
        <Text style={styles.errorText}>Unable to access camera.</Text>
      </View>
    );
  }

  return (
    <View style={styles.root}>
      <View style={[styles.buttonContainer, positionStyles.left]}>
        <CameraButton
          icon={faAngleLeft}
          onPress={() => {
            navigation.goBack();
          }}
        />
      </View>
      <View style={[styles.buttonContainer, positionStyles.right]}>
        <CameraButton
          icon={faArrowsRotate}
          onPress={() => {
            setDevicePosition(currentPosition =>
              currentPosition === 'back' ? 'front' : 'back',
            );
          }}
        />
        {device.hasTorch && (
          <CameraButton
            icon={torch === 'on' ? faSolidSun : faSun}
            onPress={() => {
              setTorch(currentTorch => (currentTorch === 'on' ? 'off' : 'on'));
            }}
          />
        )}
      </View>
      <View style={styles.helpContainer}>
        <Text style={[styles.helpText, positionStyles.help]}>
          Place the QR code within the frame.
        </Text>
      </View>
      <AddAuthenticatorsPopup
        authenticators={potentialAuthenticators}
        isOpen={potentialAuthenticators.length > 0}
        onCancel={clearPotentialAuthenticators}
        onSave={handleSave}
      />
      <Camera
        codeScanner={codeScanningEnabled ? codeScanner : undefined}
        device={device}
        isActive={true}
        style={styles.camera}
        torch={torch}
      />
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  buttonContainer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 1,
  },
  camera: {
    height: '100%',
    width: '100%',
  },
  errorHeading: {
    color: theme.colors.text,
    fontSize: theme.fontSize.lg,
    fontWeight: 'bold',
  },
  errorText: {
    color: theme.colors.textAlt,
    fontSize: theme.fontSize.sm,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  helpContainer: {
    alignItems: 'center',
    backgroundColor: theme.colors.cameraOverlay.button.base.background,
    bottom: 0,
    left: 0,
    padding: 12,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  helpText: {
    color: theme.colors.cameraOverlay.button.base.text,
    fontSize: theme.fontSize.base,
    fontWeight: 'bold',
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    flex: 1,
    justifyContent: 'center',
  },
}));

export default QrCodeScannerScreen;

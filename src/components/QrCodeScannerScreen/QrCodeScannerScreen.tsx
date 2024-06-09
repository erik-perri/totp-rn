import {faSun} from '@fortawesome/free-regular-svg-icons';
import {
  faAngleLeft,
  faArrowsRotate,
  faSun as faSolidSun,
} from '@fortawesome/free-solid-svg-icons';
import {
  FontAwesomeIcon,
  Props as FontAwesomeIconProps,
} from '@fortawesome/react-native-fontawesome';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent, useCallback, useMemo, useState} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
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

const CameraIcon: FunctionComponent<FontAwesomeIconProps> = props => {
  return <FontAwesomeIcon size={20} {...props} />;
};

const QrCodeScannerScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'QrCodeScanner'>
> = ({navigation}) => {
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
        <Pressable
          onPress={() => {
            navigation.goBack();
          }}
          style={buttonStyleGenerator}>
          <CameraIcon icon={faAngleLeft} />
        </Pressable>
      </View>
      <View style={[styles.buttonContainer, positionStyles.right]}>
        <Pressable
          onPress={() => {
            setDevicePosition(currentPosition =>
              currentPosition === 'back' ? 'front' : 'back',
            );
          }}
          style={buttonStyleGenerator}>
          <CameraIcon icon={faArrowsRotate} />
        </Pressable>
        {device.hasTorch && (
          <Pressable
            onPress={() => {
              setTorch(currentTorch => (currentTorch === 'on' ? 'off' : 'on'));
            }}
            style={buttonStyleGenerator}>
            <CameraIcon icon={torch === 'on' ? faSolidSun : faSun} />
          </Pressable>
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

const styles = StyleSheet.create({
  buttonBack: {
    backgroundColor: 'transparent',
  },
  buttonFlash: {
    //
  },
  buttonSwitch: {
    //
  },
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
    fontSize: 20,
    fontWeight: 'bold',
  },
  errorText: {
    fontSize: 14,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  helpContainer: {
    alignItems: 'center',
    backgroundColor: '#9ca3af44',
    bottom: 0,
    left: 0,
    padding: 12,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  helpText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  root: {
    backgroundColor: '#f9fafb',
    flex: 1,
  },
});

function buttonStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    borderRadius: 100,
    padding: 8,
    backgroundColor: pressed ? '#4b556344' : '#9ca3af44',
  };
}

export default QrCodeScannerScreen;

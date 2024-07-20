import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {Pressable, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type CameraButtonProps = {
  icon: IconProp;
  onPress: () => void;
};

const CameraButton: FunctionComponent<CameraButtonProps> = ({
  icon,
  onPress,
}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <Pressable onPress={onPress}>
      {({pressed}) => (
        <View style={[styles.button, pressed && styles.buttonPressed]}>
          <FontAwesomeIcon
            icon={icon}
            style={{
              ...styles.text,
              ...(pressed && styles.textPressed),
            }}
            size={20}
          />
        </View>
      )}
    </Pressable>
  );
};

const stylesheet = createStyleSheet(theme => ({
  button: {
    backgroundColor: theme.colors.cameraOverlay.button.base.background,
    borderRadius: 9999,
    padding: 8,
  },
  buttonPressed: {
    backgroundColor: theme.colors.cameraOverlay.button.pressed.background,
  },
  text: {
    color: theme.colors.cameraOverlay.button.base.text,
  },
  textPressed: {
    color: theme.colors.cameraOverlay.button.pressed.text,
  },
}));

export default CameraButton;

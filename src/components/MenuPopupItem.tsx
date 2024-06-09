import {IconProp} from '@fortawesome/fontawesome-svg-core';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent} from 'react';
import {
  Pressable,
  PressableStateCallbackType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

type MenuPopupItemProps = {
  icon: IconProp;
  label: string;
  onPress: () => void;
};

const MenuPopupItem: FunctionComponent<MenuPopupItemProps> = ({
  icon,
  label,
  onPress,
}) => {
  return (
    <Pressable onPress={onPress} style={buttonStyleGenerator}>
      <View style={styles.buttonIcon}>
        <FontAwesomeIcon icon={icon} size={12} />
      </View>
      <Text style={styles.buttonText}>{label}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    gap: 16,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonIcon: {
    //
  },
});

function buttonStyleGenerator({pressed}: PressableStateCallbackType) {
  return {
    ...styles.button,
    backgroundColor: pressed ? '#f3f4f6' : 'transparent',
  };
}

export default MenuPopupItem;

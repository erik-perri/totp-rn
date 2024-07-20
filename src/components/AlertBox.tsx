import {
  faCircleInfo,
  faExclamationCircle,
} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import React, {FunctionComponent, useMemo} from 'react';
import {Text, View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

type AlertBoxTheme = 'info' | 'error';

type AlertBoxProps = {
  additionalMessage?: string;
  message: string;
  theme: AlertBoxTheme;
};

const AlertBox: FunctionComponent<AlertBoxProps> = ({
  additionalMessage,
  message,
  theme,
}) => {
  const {styles} = useStyles(stylesheet);

  const [containerStyles, textStyles, icon] = useMemo(() => {
    switch (theme) {
      case 'error':
        return [styles.errorContainer, styles.errorText, faExclamationCircle];
      case 'info':
        return [styles.infoContainer, styles.infoText, faCircleInfo];
    }
  }, [styles, theme]);

  return (
    <View style={[styles.container, containerStyles]}>
      <FontAwesomeIcon icon={icon} size={18} style={textStyles} />
      <View style={styles.innerContainer}>
        <Text style={[styles.text, textStyles]}>{message}</Text>
        {additionalMessage && (
          <Text style={styles.textAdditional}>{additionalMessage}</Text>
        )}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 8,
    padding: 12,
  },
  errorContainer: {
    backgroundColor: theme.colors.alertBox.error.background,
  },
  errorText: {
    color: theme.colors.alertBox.error.text,
  },
  infoContainer: {
    backgroundColor: theme.colors.alertBox.info.background,
  },
  infoText: {
    color: theme.colors.alertBox.info.text,
  },
  innerContainer: {
    flexShrink: 1,
    gap: 4,
  },
  text: {
    flexShrink: 1,
    fontSize: theme.fontSize.base,
  },
  textAdditional: {
    color: theme.colors.textAlt,
    flexShrink: 1,
    fontSize: theme.fontSize.sm,
  },
}));

export default AlertBox;

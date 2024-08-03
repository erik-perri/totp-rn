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
  const {styles} = useStyles(stylesheet, {theme});

  const icon = useMemo(() => {
    switch (theme) {
      case 'error':
        return faExclamationCircle;
      case 'info':
        return faCircleInfo;
    }
  }, [theme]);

  return (
    <View style={styles.container}>
      <FontAwesomeIcon icon={icon} size={18} style={styles.icon} />
      <View style={styles.innerContainer}>
        <Text style={styles.text}>{message}</Text>
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

    variants: {
      theme: {
        error: {
          backgroundColor: theme.colors.alertBox.error.background,
        },
        info: {
          backgroundColor: theme.colors.alertBox.info.background,
        },
      },
    },
  },
  icon: {
    variants: {
      theme: {
        error: {
          color: theme.colors.alertBox.error.text,
        },
        info: {
          color: theme.colors.alertBox.info.text,
        },
      },
    },
  },
  innerContainer: {
    flexShrink: 1,
    gap: 4,
  },
  text: {
    flexShrink: 1,
    fontSize: theme.fontSize.base,

    variants: {
      theme: {
        error: {
          color: theme.colors.alertBox.error.text,
        },
        info: {
          color: theme.colors.alertBox.info.text,
        },
      },
    },
  },
  textAdditional: {
    color: theme.colors.textAlt,
    flexShrink: 1,
    fontSize: theme.fontSize.sm,

    variants: {
      theme: {
        error: {
          color: theme.colors.alertBox.error.textAlt,
        },
        info: {
          color: theme.colors.alertBox.info.textAlt,
        },
      },
    },
  },
}));

export default AlertBox;

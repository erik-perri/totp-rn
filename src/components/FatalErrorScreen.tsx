import React, {FunctionComponent, useMemo} from 'react';
import {ScrollView, Text, View} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

import Heading from './Heading';

type FatalErrorScreenProps = {
  error: unknown;
};

const FatalErrorScreen: FunctionComponent<FatalErrorScreenProps> = ({
  error,
}) => {
  const {styles, theme} = useStyles(stylesheet);

  const errorMessage = useMemo(() => {
    if (error instanceof Error) {
      return error.message;
    }

    return String(error);
  }, [error]);

  return (
    <View style={styles.root}>
      <Svg style={styles.svg} viewBox="18.644 31.086 240 320">
        <Path
          fill={theme.colors.text}
          d="M38.644 31.086h200v10h-200v-10Zm0 10v10h-10v-10h10Zm200 0h10v10h-10v-10Zm-220 10h10v260h-10v-260Zm230 0h10v260h-10v-260Zm-30 20h-160v-10h160v10Zm-160 0v140h-10v-140h10Zm160 0h10v140h-10v-140Zm-130 40h-10v-10h10v10Zm10 0v-10h10v10h-10Zm70 0h-10v-10h10v10Zm10 0v-10h10v10h-10Zm-90 0h10v10h-10v-10Zm80 0h10v10h-10v-10Zm-80 10v10h-10v-10h10Zm10 0h10v10h-10v-10Zm70 0v10h-10v-10h10Zm10 0h10v10h-10v-10Zm-60 30h-10v-10h10v10Zm20 0v-10h10v10h-10Zm-20 0h20v10h-20v-10Zm40 30h-50v-10h50v10Zm-50 0v10h-10v-10h10Zm50 0h20v10h-20v-10Zm20 10h10v10h-10v-10Zm-120 20h160v10h-160v-10Zm100 50h60v10h-60v-10Zm-110 10h20v10h-20v-10Zm-19.999 40h10v40h-10v-40Zm210 0h10v40h-10v-40Z"
        />
        <Path
          fill={theme.colors.text}
          d="M38.196 311.086h202.458v10H38.196v-10Zm-.349 30h201.738v10H37.847v-10Z"
        />
      </Svg>

      <View style={styles.textContainer}>
        <Heading>You broke it.</Heading>

        {errorMessage.includes('\n') ? (
          <ScrollView
            style={styles.scrollContainer}
            contentContainerStyle={styles.scrollContentContainer}>
            <Text style={styles.message}>{errorMessage}</Text>
          </ScrollView>
        ) : (
          <Text style={styles.message}>{errorMessage}</Text>
        )}
      </View>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  message: {
    color: theme.colors.textAlt,
    flexShrink: 1,
    fontSize: theme.fontSize.sm,
  },
  root: {
    alignItems: 'center',
    backgroundColor: theme.colors.background,
    display: 'flex',
    flex: 1,
    gap: 16,
    justifyContent: 'center',
  },
  scrollContainer: {
    borderColor: theme.colors.input.border,
    borderWidth: 1,
    maxHeight: UnistylesRuntime.screen.height * 0.15,
    width: UnistylesRuntime.screen.width * 0.8,
  },
  scrollContentContainer: {
    padding: 12,
  },
  svg: {
    height: 160,
    width: 120,
  },
  textContainer: {
    alignItems: 'center',
    gap: 8,
  },
}));

export default FatalErrorScreen;

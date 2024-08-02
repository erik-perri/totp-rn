import React, {FunctionComponent, PropsWithChildren} from 'react';
import {KeyboardAvoidingView, ScrollView, View} from 'react-native';
import {
  createStyleSheet,
  UnistylesRuntime,
  useStyles,
} from 'react-native-unistyles';

const OnboardingShell: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.root}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
};

const stylesheet = createStyleSheet(theme => ({
  avoidingView: {
    flex: 1,
  },
  contentContainer: {
    flexGrow: 1,
    gap: 24,
    padding: 16,
  },
  root: {
    backgroundColor: theme.colors.background,
    flex: 1,
    paddingBottom: UnistylesRuntime.insets.bottom,
    paddingLeft: UnistylesRuntime.insets.left,
    paddingRight: UnistylesRuntime.insets.right,
    paddingTop: UnistylesRuntime.insets.top,
  },
}));

export default OnboardingShell;

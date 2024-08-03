import React, {FunctionComponent, PropsWithChildren} from 'react';
import {KeyboardAvoidingView, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const OnboardingShell: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <SafeAreaView style={styles.root}>
      <KeyboardAvoidingView behavior="padding" style={styles.avoidingView}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
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
  },
}));

export default OnboardingShell;

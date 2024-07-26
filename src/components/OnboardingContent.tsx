import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const OnboardingContent: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {styles} = useStyles(stylesheet);

  return <View style={styles.container}>{children}</View>;
};

const stylesheet = createStyleSheet(() => ({
  container: {
    gap: 24,
  },
}));

export default OnboardingContent;

import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const OnboardingActions: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {styles} = useStyles(stylesheet);

  return <View style={styles.container}>{children}</View>;
};

const stylesheet = createStyleSheet(() => ({
  container: {
    flex: 1,
    gap: 24,
    justifyContent: 'flex-end',
  },
}));

export default OnboardingActions;

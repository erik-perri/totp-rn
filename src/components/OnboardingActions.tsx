import React, {FunctionComponent, PropsWithChildren} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const OnboardingActions: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const {styles} = useStyles(stylesheet);

  return (
    <View style={styles.container}>
      <View style={styles.buttonContainer}>{children}</View>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  buttonContainer: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    gap: 24,
    justifyContent: 'flex-end',
  },
}));

export default OnboardingActions;

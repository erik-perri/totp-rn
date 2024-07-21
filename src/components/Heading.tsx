import React, {FunctionComponent, PropsWithChildren} from 'react';
import {Text} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

const Heading: FunctionComponent<PropsWithChildren> = ({children}) => {
  const {styles} = useStyles(stylesheet);

  return <Text style={styles.heading}>{children}</Text>;
};

const stylesheet = createStyleSheet(theme => ({
  heading: {
    color: theme.colors.text,
    fontSize: theme.fontSize.xl,
    fontWeight: 'semibold',
  },
}));

export default Heading;

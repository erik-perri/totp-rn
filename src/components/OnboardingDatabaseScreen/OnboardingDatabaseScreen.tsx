import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FunctionComponent} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import Button from '../Button/Button';
import ButtonText from '../Button/ButtonText';
import Heading from '../Heading';
import {MainStackParamList} from '../MainStack';
import OnboardingActions from '../OnboardingActions';
import OnboardingShell from '../OnboardingShell';
import Paragraph from '../Paragraph';

const OnboardingDatabaseScreen: FunctionComponent<
  NativeStackScreenProps<MainStackParamList, 'OnboardingDatabase'>
> = ({navigation}) => {
  const {styles} = useStyles(stylesheet);

  function onCreateDatabase() {
    // TODO Create KDBX database, forward it and master password on
    navigation.navigate('OnboardingStorage');
  }

  return (
    <OnboardingShell>
      <Heading>Database Setup</Heading>

      <Paragraph>
        Authenticators are stored in a KeePass database file. Biometrics can be
        enabled to unlock the database without the master password.
      </Paragraph>

      <OnboardingActions>
        <View style={styles.buttonContainer}>
          <Button onPress={onCreateDatabase} variant="solid">
            <ButtonText>Create Database</ButtonText>
          </Button>
        </View>
      </OnboardingActions>
    </OnboardingShell>
  );
};

const stylesheet = createStyleSheet(() => ({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
}));

export default OnboardingDatabaseScreen;

import {benchmarkAes256KdfKey} from 'kdbx-ts';
import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useState,
} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import useSharedLoading from '../../hooks/useSharedLoading';
import safeInputToNumber from '../../utilities/safeInputToNumber';
import FormGroup from '../FormGroup';
import FormTextInput from '../FormTextInput';
import IterationCalculateButton from './IterationCalculateButton';

export type AesKdfSettingsData = {
  iterations: number;
};

type AesKdfSettingsProps = {
  onChange: (data: AesKdfSettingsData) => void;
};

export const AesKdfSettings: FunctionComponent<AesKdfSettingsProps> = ({
  onChange,
}) => {
  const {styles} = useStyles(stylesheet);

  const [loading, setLoading] = useSharedLoading(
    'OnboardingDatabaseCreateScreen',
    AesKdfSettings.name,
  );
  const [iterations, setIterations] = useState<string>('150000');

  const onCalculateIterations = useCallback(() => {
    setLoading(true);

    void (async () => {
      try {
        const calculatedIterations = await benchmarkAes256KdfKey(1000);
        const roundedIterations =
          calculatedIterations > 1000
            ? Math.round(calculatedIterations / 1000) * 1000
            : calculatedIterations;

        setIterations(roundedIterations.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [setLoading]);

  useEffect(() => {
    onChange({
      iterations: safeInputToNumber(iterations),
    });
  }, [iterations, onChange]);

  return (
    <View style={styles.container}>
      <FormGroup label="Iterations">
        <FormTextInput
          inputMode="numeric"
          onChangeText={setIterations}
          value={iterations}
        />
        <IterationCalculateButton
          onPress={onCalculateIterations}
          disabled={loading}
        />
      </FormGroup>
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    gap: 16,
  },
}));

export default AesKdfSettings;

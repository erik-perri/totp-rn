import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
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
  const {loading, setLoading} = useSharedLoading(
    'OnboardingDatabaseCreateScreen',
    useRef(Symbol('AesKdfSettings')),
  );
  const [iterations, setIterations] = useState<string>('150000');

  const onCalculateIterations = useCallback(() => {
    setLoading(true);

    setTimeout(() => {
      void (async () => {
        // TODO Benchmark
        setIterations('122000');
        setLoading(false);
        return Promise.resolve();
      })();
    }, 10);
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
    justifyContent: 'center',
  },
  container: {
    gap: 16,
  },
}));

export default AesKdfSettings;

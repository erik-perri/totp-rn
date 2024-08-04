import {Argon2Type, Argon2Version, benchmarkArgon2KdfKey} from 'kdbx-ts';
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

export type Argon2KdfSettingsData = {
  iterations: number;
  memoryInBytes: number;
  parallelism: number;
};

type Argon2KdfSettingsProps = {
  onChange: (data: Argon2KdfSettingsData) => void;
  type: 'argon2d' | 'argon2id';
};

export const Argon2KdfSettings: FunctionComponent<Argon2KdfSettingsProps> = ({
  onChange,
  type,
}) => {
  const {styles} = useStyles(stylesheet);

  const [loading, setLoading] = useSharedLoading(
    'OnboardingDatabaseCreateScreen',
    Argon2KdfSettings.name,
  );
  const [iterations, setIterations] = useState<string>('20');
  const [memoryUsage, setMemoryUsage] = useState<string>('64');
  const [parallelism, setParallelism] = useState<string>('2');

  const onCalculateIterations = useCallback(() => {
    setLoading(true);

    void (async () => {
      try {
        const calculatedIterations = await benchmarkArgon2KdfKey(
          1000,
          BigInt(memoryUsage) * BigInt(1024 * 1024),
          BigInt(parallelism),
          type === 'argon2d' ? Argon2Type.Argon2d : Argon2Type.Argon2id,
          Argon2Version.V13,
        );

        setIterations(calculatedIterations.toString());
      } finally {
        setLoading(false);
      }
    })();
  }, [memoryUsage, parallelism, setLoading, type]);

  useEffect(() => {
    onChange({
      iterations: safeInputToNumber(iterations),
      memoryInBytes: safeInputToNumber(memoryUsage) * 1024 * 1024,
      parallelism: safeInputToNumber(parallelism),
    });
  }, [iterations, memoryUsage, onChange, parallelism]);

  return (
    <View style={styles.container}>
      <View style={styles.columnInputs}>
        <FormGroup label="Memory Usage">
          <FormTextInput
            inputMode="numeric"
            onChangeText={setMemoryUsage}
            suffix="MiB"
            value={memoryUsage}
          />
        </FormGroup>

        <FormGroup label="Parallelism">
          <FormTextInput
            inputMode="numeric"
            onChangeText={setParallelism}
            suffix="threads"
            value={parallelism}
          />
        </FormGroup>
      </View>

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
  columnInputs: {
    flexDirection: 'row',
    gap: 16,
  },
  container: {
    gap: 16,
  },
}));

export default Argon2KdfSettings;

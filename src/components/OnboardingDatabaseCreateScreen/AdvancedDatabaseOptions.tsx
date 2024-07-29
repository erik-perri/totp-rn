import React, {FunctionComponent, useCallback, useState} from 'react';
import {View} from 'react-native';
import {createStyleSheet, useStyles} from 'react-native-unistyles';

import FormGroup from '../FormGroup';
import FormSelect from '../Select/FormSelect';
import AesKdfSettings, {AesKdfSettingsData} from './AesKdfSettings';
import Argon2KdfSettings, {Argon2KdfSettingsData} from './Argon2KdfSettings';

type AdvancedDatabaseOptionsProps = {
  onChange: (data: AdvancedDatabaseOptionsData) => void;
};

export type AdvancedDatabaseOptionsData =
  | {
      type: 'argon2d' | 'argon2id';
      iterations: number;
      memoryUsage: number;
      parallelism: number;
    }
  | {
      type: 'aes';
      iterations: number;
    };

const encryptionAlgorithmOptions = [
  {label: 'AES 256-bit', value: 'aes256'},
  {label: 'Twofish 256-bit', value: 'twofish'},
  {label: 'ChaCha20 256-bit', value: 'chacha20'},
];

const kdfOptions = [
  {label: 'Argon2d', value: 'argon2d'},
  {label: 'Argon2id', value: 'argon2id'},
  {label: 'AES-KDF', value: 'aes'},
];

export const AdvancedDatabaseOptions: FunctionComponent<
  AdvancedDatabaseOptionsProps
> = ({onChange}) => {
  const {styles} = useStyles(stylesheet);
  const [encryptionAlgorithm, setEncryptionAlgorithm] =
    useState<string>('aes256');
  const [kdf, setKdf] = useState<string>('argon2d');

  const setArgonKdfSettings = useCallback(
    (params: Argon2KdfSettingsData) => {
      if (kdf !== 'argon2d' && kdf !== 'argon2id') {
        throw new Error(
          `Unexpected KDF type. Expected "argon2d" or "argon2id", got "${kdf}"`,
        );
      }

      onChange({
        type: kdf,
        iterations: params.iterations,
        memoryUsage: params.memoryUsage,
        parallelism: params.parallelism,
      });
    },
    [kdf, onChange],
  );

  const setAesKdfSettings = useCallback(
    (params: AesKdfSettingsData) => {
      if (kdf !== 'aes') {
        throw new Error(`Unexpected KDF type. Expected "aes", got "${kdf}"`);
      }

      onChange({
        type: kdf,
        iterations: params.iterations,
      });
    },
    [kdf, onChange],
  );

  return (
    <View style={styles.container}>
      <FormGroup label="Encryption Algorithm">
        <FormSelect
          emptyLabel="No selection"
          onChange={setEncryptionAlgorithm}
          options={encryptionAlgorithmOptions}
          value={encryptionAlgorithm}
        />
      </FormGroup>

      <FormGroup label="Key Derivation Function">
        <FormSelect
          emptyLabel="No selection"
          onChange={setKdf}
          options={kdfOptions}
          value={kdf}
        />
      </FormGroup>

      {kdf === 'argon2d' || kdf === 'argon2id' ? (
        <Argon2KdfSettings type={kdf} onChange={setArgonKdfSettings} />
      ) : kdf === 'aes' ? (
        <AesKdfSettings onChange={setAesKdfSettings} />
      ) : null}
    </View>
  );
};

const stylesheet = createStyleSheet(() => ({
  container: {
    gap: 16,
  },
}));

export default AdvancedDatabaseOptions;

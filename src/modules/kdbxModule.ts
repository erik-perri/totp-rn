import {NativeModules} from 'react-native';

import safeBigIntToNumber from '../utilities/safeBigIntToNumber';

// TODO Replace with import
type KdbxAesKdfParameters = {
  rounds: bigint;
  seed: Uint8Array;
};

// TODO Replace with import
type KdbxArgon2KdfParameters = {
  iterations: bigint;
  memoryInBytes: bigint;
  parallelism: bigint;
  seed: Uint8Array;
  type: number;
  version: number;
};

const {KdbxModule} = NativeModules as {
  KdbxModule: {
    getConstants: () => {
      ARGON2_TYPE_2D: number;
      ARGON2_TYPE_2ID: number;
      ARGON2_VERSION_10: number;
      ARGON2_VERSION_13: number;
    };

    transformAes256KdfKey: (
      key: number[],
      rounds: number,
      seed: number[],
    ) => Promise<number[]>;

    transformArgon2KdfKey: (
      key: number[],
      salt: number[],
      version: number,
      type: number,
      memoryInKibibytes: number,
      parallelism: number,
      iterations: number,
    ) => Promise<number[]>;
  };
};

export async function transformAes256KdfKey(
  key: Uint8Array,
  parameters: KdbxAesKdfParameters,
): Promise<Uint8Array> {
  const transformed = await KdbxModule.transformAes256KdfKey(
    Array.from(key),
    safeBigIntToNumber(parameters.rounds),
    Array.from(parameters.seed),
  );

  return Uint8Array.from(transformed);
}

export async function transformArgon2KdfKey(
  key: Uint8Array,
  parameters: KdbxArgon2KdfParameters,
): Promise<Uint8Array> {
  const transformed = await KdbxModule.transformArgon2KdfKey(
    Array.from(key),
    Array.from(parameters.seed),
    parameters.version,
    parameters.type,
    safeBigIntToNumber(parameters.memoryInBytes / BigInt(1024)),
    safeBigIntToNumber(parameters.parallelism),
    safeBigIntToNumber(parameters.iterations),
  );

  return Uint8Array.from(transformed);
}

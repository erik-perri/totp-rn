import {
  Argon2Type,
  CompressionAlgorithm,
  createAesKdfParameters,
  createArgon2KdfParameters,
  createInnerHeaderEncryptionKey,
  createOuterHeaderEncryptionIV,
  createOuterHeaderMasterSeed,
  createPasswordKey,
  KdbxWriteResult,
  KeePass2,
  SymmetricCipherAlgorithm,
  writeKdbxFile,
} from 'kdbx-ts';

import generateUuid4 from '../generateUuid4';
import stringifyUuid from '../stringifyUuid';

export type AesKdfParameters = {
  type: 'aes';
  iterations: number;
};

export type Argon2KdfParameters = {
  type: 'argon2d' | 'argon2id';
  iterations: number;
  memoryUsage: number;
  parallelism: number;
};

export type KdfParameters = Argon2KdfParameters | AesKdfParameters;

export type EncryptionAlgorithm = 'aes256' | 'chacha20';

export default async function createKdbxDatabase(
  masterPassword: string,
  encryptionAlgorithm: EncryptionAlgorithm,
  kdfParameters: KdfParameters,
): Promise<KdbxWriteResult> {
  const cipherAlgorithm =
    encryptionAlgorithm === 'aes256'
      ? SymmetricCipherAlgorithm.Aes256_CBC
      : SymmetricCipherAlgorithm.ChaCha20;

  const keys = [await createPasswordKey(masterPassword)];

  const parameters =
    kdfParameters.type === 'aes'
      ? await createAesKdfParameters(BigInt(kdfParameters.iterations))
      : await createArgon2KdfParameters(
          BigInt(kdfParameters.iterations),
          BigInt(kdfParameters.memoryUsage),
          BigInt(kdfParameters.parallelism),
          kdfParameters.type === 'argon2d'
            ? Argon2Type.Argon2d
            : Argon2Type.Argon2id,
        );

  return await writeKdbxFile(keys, {
    outerHeader: {
      signature: {
        signature1: KeePass2.signature1,
        signature2: KeePass2.signature2,
        versionMajor: 4,
        versionMinor: 1,
      },
      fields: {
        cipherAlgorithm: cipherAlgorithm,
        compressionAlgorithm: CompressionAlgorithm.GZip,
        encryptionIV: await createOuterHeaderEncryptionIV(cipherAlgorithm),
        endOfHeader: Uint8Array.from(Buffer.from('\r\n\r\n')),
        kdfParameters: parameters,
        masterSeed: await createOuterHeaderMasterSeed(),
      },
    },
    innerHeader: {
      binaryPool: [],
      endOfHeader: new Uint8Array(0),
      innerEncryptionAlgorithm: SymmetricCipherAlgorithm.ChaCha20,
      innerEncryptionKey: await createInnerHeaderEncryptionKey(
        SymmetricCipherAlgorithm.ChaCha20,
      ),
    },
    database: {
      metadata: {
        generator: 'RnTotp',
        name: 'Authenticators',
      },
      root: {
        group: {
          entries: [],
          name: 'Root',
          uuid: stringifyUuid(generateUuid4()),
        },
      },
    },
  });
}

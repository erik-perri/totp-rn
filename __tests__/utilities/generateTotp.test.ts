import {describe, expect, it} from '@jest/globals';

import TotpAlgorithm from '../../src/enums/TotpAlgorithm';
import generateTotp from '../../src/utilities/generateTotp';

describe('generateTotp', () => {
  it.each([
    [
      'Sha1 94287082',
      {
        expected: '94287082',
        secret: '12345678901234567890',
        algorithm: TotpAlgorithm.Sha1,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 59,
      },
    ],
    [
      'Sha256 46119246',
      {
        expected: '46119246',
        secret: '12345678901234567890123456789012',
        algorithm: TotpAlgorithm.Sha256,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 59,
      },
    ],
    [
      'Sha512 90693936',
      {
        expected: '90693936',
        secret:
          '1234567890123456789012345678901234567890123456789012345678901234',
        algorithm: TotpAlgorithm.Sha512,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 59,
      },
    ],
    [
      'Sha1 07081804',
      {
        expected: '07081804',
        secret: '12345678901234567890',
        algorithm: TotpAlgorithm.Sha1,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1111111109,
      },
    ],
    [
      'Sha256 68084774',
      {
        expected: '68084774',
        secret: '12345678901234567890123456789012',
        algorithm: TotpAlgorithm.Sha256,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1111111109,
      },
    ],
    [
      'Sha512 25091201',
      {
        expected: '25091201',
        secret:
          '1234567890123456789012345678901234567890123456789012345678901234',
        algorithm: TotpAlgorithm.Sha512,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1111111109,
      },
    ],
    [
      'Sha1 14050471',
      {
        expected: '14050471',
        secret: '12345678901234567890',
        algorithm: TotpAlgorithm.Sha1,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1111111111,
      },
    ],
    [
      'Sha256 67062674',
      {
        expected: '67062674',
        secret: '12345678901234567890123456789012',
        algorithm: TotpAlgorithm.Sha256,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1111111111,
      },
    ],
    [
      'Sha512 99943326',
      {
        expected: '99943326',
        secret:
          '1234567890123456789012345678901234567890123456789012345678901234',
        algorithm: TotpAlgorithm.Sha512,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1111111111,
      },
    ],
    [
      'Sha1 89005924',
      {
        expected: '89005924',
        secret: '12345678901234567890',
        algorithm: TotpAlgorithm.Sha1,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1234567890,
      },
    ],
    [
      'Sha256 91819424',
      {
        expected: '91819424',
        secret: '12345678901234567890123456789012',
        algorithm: TotpAlgorithm.Sha256,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1234567890,
      },
    ],
    [
      'Sha512 93441116',
      {
        expected: '93441116',
        secret:
          '1234567890123456789012345678901234567890123456789012345678901234',
        algorithm: TotpAlgorithm.Sha512,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 1234567890,
      },
    ],
    [
      'Sha1 69279037',
      {
        expected: '69279037',
        secret: '12345678901234567890',
        algorithm: TotpAlgorithm.Sha1,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 2000000000,
      },
    ],
    [
      'Sha256 90698825',
      {
        expected: '90698825',
        secret: '12345678901234567890123456789012',
        algorithm: TotpAlgorithm.Sha256,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 2000000000,
      },
    ],
    [
      'Sha512 38618901',
      {
        expected: '38618901',
        secret:
          '1234567890123456789012345678901234567890123456789012345678901234',
        algorithm: TotpAlgorithm.Sha512,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 2000000000,
      },
    ],
    [
      'Sha1 65353130',
      {
        expected: '65353130',
        secret: '12345678901234567890',
        algorithm: TotpAlgorithm.Sha1,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 20000000000,
      },
    ],
    [
      'Sha256 77737706',
      {
        expected: '77737706',
        secret: '12345678901234567890123456789012',
        algorithm: TotpAlgorithm.Sha256,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 20000000000,
      },
    ],
    [
      'Sha512 47863826',
      {
        expected: '47863826',
        secret:
          '1234567890123456789012345678901234567890123456789012345678901234',
        algorithm: TotpAlgorithm.Sha512,
        timeStep: 30,
        codeSize: 8,
        initialTime: 0,
        currentTime: 20000000000,
      },
    ],
  ])(
    'should generate a TOTP code %s',
    (
      _,
      {
        expected,
        secret,
        algorithm,
        timeStep,
        codeSize,
        initialTime,
        currentTime,
      },
    ) => {
      const result = generateTotp(
        secret,
        algorithm,
        timeStep,
        codeSize,
        initialTime,
        currentTime,
      );

      expect(result).toBe(expected);
    },
  );
});

import {describe, expect, it} from '@jest/globals';

import TotpAlgorithm from '../../src/enums/TotpAlgorithm';
import {AuthenticatorWithoutId} from '../../src/parsers/authenticatorParser';
import generateOtpAuthUrl from '../../src/utilities/generateOtpAuthUrl';

describe('generateOtpAuthUrl', () => {
  it.each([
    [
      'with user',
      {
        authenticator: {
          algorithm: TotpAlgorithm.Sha1,
          codeSize: 6,
          initialTime: 0,
          issuer: 'Example',
          secret: 'TEST',
          timeStep: 30,
          username: 'alice',
        } satisfies AuthenticatorWithoutId,
        expected:
          'otpauth://totp/Example:alice?issuer=Example&secret=TEST&algorithm=sha1&digits=6&period=30',
      },
    ],
    [
      'without user',
      {
        authenticator: {
          algorithm: TotpAlgorithm.Sha256,
          codeSize: 8,
          initialTime: 0,
          issuer: 'Mock',
          secret: 'MOCK',
          timeStep: 60,
        } satisfies AuthenticatorWithoutId,
        expected:
          'otpauth://totp/Mock?issuer=Mock&secret=MOCK&algorithm=sha256&digits=8&period=60',
      },
    ],
  ])('should expected parameters %s', (_, {authenticator, expected}) => {
    // Arrange
    // Nothing to arrange.

    // Act
    const result = generateOtpAuthUrl(authenticator);

    // Assert
    expect(result).toBe(expected);
  });
});

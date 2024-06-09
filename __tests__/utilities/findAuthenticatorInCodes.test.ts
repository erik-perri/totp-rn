import {describe, expect, it} from '@jest/globals';

import TotpAlgorithm from '../../src/enums/TotpAlgorithm';
import findAuthenticatorInCodes from '../../src/utilities/findAuthenticatorInCodes';

describe('findAuthenticatorInCodes', () => {
  it('should return an empty array if no codes are provided', () => {
    const result = findAuthenticatorInCodes([]);

    expect(result).toEqual([]);
  });

  it('should filter codes to the expected result', () => {
    const result = findAuthenticatorInCodes([
      {
        corners: [],
        frame: {
          height: 174,
          width: 165,
          x: 284,
          y: 505,
        },
        type: 'qr',
        value:
          'otpauth://totp/Testing%20TOTP:none?secret=KRCVGVCJJZDQ%3D%3D%3D%3D&period=30&digits=6&issuer=Testing%20TOTP',
      },
    ]);

    expect(result).toEqual([
      {
        algorithm: TotpAlgorithm.Sha1,
        codeSize: 6,
        initialTime: 0,
        issuer: 'Testing TOTP',
        secret: 'KRCVGVCJJZDQ====',
        timeStep: 30,
        username: 'none',
      },
    ]);
  });

  // TODO Test cases for errors
});

import {describe, expect, it, jest} from '@jest/globals';

import decodeBase32 from '../../src/utilities/decodeBase32';

describe('decodeBase32', () => {
  it.each([
    ['return undefined if input is invalid', {input: '1', expected: undefined}],
    [
      'return empty if input is empty',
      {input: '', expected: Buffer.from('', 'utf8')},
    ],
    [
      'return expected result for small results',
      {
        input: 'IE======',
        expected: Buffer.from('A', 'utf8'),
      },
    ],
    [
      'return expected result for small results',
      {
        input: 'ME======',
        expected: Buffer.from('a', 'utf8'),
      },
    ],
    [
      'return expected result when padded',
      {
        input: 'JVXWG2ZAON2HE2LOM4======',
        expected: Buffer.from('Mock string', 'utf8'),
      },
    ],
    [
      'return expected result when not padded',
      {
        input: 'JVXWG2ZAON2HE2LOM4',
        expected: Buffer.from('Mock string', 'utf8'),
      },
    ],
    [
      'return expected result when not consistent case',
      {
        input: 'KRsxg5a=',
        expected: Buffer.from('Test', 'utf8'),
      },
    ],
  ])('should %s', (_, {input, expected}) => {
    const result = decodeBase32(input);

    expect(result).toEqual(expected);
  });
});

const TotpAlgorithm = {
  Sha1: 'sha1',
  Sha256: 'sha256',
  Sha512: 'sha512',
} as const;

type TotpAlgorithm = (typeof TotpAlgorithm)[keyof typeof TotpAlgorithm];

export default TotpAlgorithm;

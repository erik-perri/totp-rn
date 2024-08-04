import {KdfParameters} from './kdbx/createKdbxDatabase';

export default function isKdfParametersValid(
  options: KdfParameters | undefined,
): options is KdfParameters {
  if (!options) {
    return false;
  }

  switch (options.type) {
    case 'aes':
      if (isInvalidUnsignedNumber(options.iterations)) {
        return false;
      }

      break;
    case 'argon2d':
    case 'argon2id':
      if (
        isInvalidUnsignedNumber(options.iterations) ||
        isInvalidUnsignedNumber(options.memoryUsage) ||
        isInvalidUnsignedNumber(options.parallelism)
      ) {
        return false;
      }

      break;
  }

  return true;
}

function isInvalidUnsignedNumber(value: number): boolean {
  return isNaN(value) || value < 1;
}

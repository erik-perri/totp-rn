import {KdbxError, parseKdbxHeader} from 'kdbx-ts';

import {NativeFile, readFile} from '../../modules/filesystemModule';

type ValidationResult =
  | {
      success: true;
    }
  | {
      success: false;
      message: string;
    };

export default async function validateKdbxFile(
  file: NativeFile,
): Promise<ValidationResult> {
  try {
    const bytes = await readFile(file.uri);

    parseKdbxHeader(bytes);

    return {success: true};
  } catch (error) {
    if (error instanceof Error) {
      if (error instanceof KdbxError) {
        return {
          success: false,
          message: `${error.message.replace(/\.$/, '')}.`,
        };
      }

      return {
        success: false,
        message: `Unable to read file. ${error.message.replace(/\.$/, '')}.`,
      };
    }

    return {success: false, message: 'Unable to read file.'};
  }
}

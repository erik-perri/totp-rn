import {
  createPasswordKey,
  KdbxFile,
  KdbxWriteResult,
  randomizeSeeds,
  writeKdbxFile,
} from 'kdbx-ts';

import {NativeFile, writeFile} from '../../modules/filesystemModule';

export default async function saveKdbxDatabase(
  file: NativeFile,
  masterPassword: string,
  kdbxFile: KdbxFile,
): Promise<KdbxWriteResult> {
  const keys = [await createPasswordKey(masterPassword)];

  const updatedFile = await randomizeSeeds(kdbxFile);

  const result = await writeKdbxFile(keys, updatedFile);

  await writeFile(file.uri, result.bytes);

  return result;
}

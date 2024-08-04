import {createPasswordKey, KdbxReadResult, readKdbxFile} from 'kdbx-ts';

import {NativeFile, readFile} from '../../modules/filesystemModule';

export default async function openKdbxDatabase(
  file: NativeFile,
  masterPasswordOrCompositeKey: string | Uint8Array,
): Promise<KdbxReadResult> {
  const bytes = await readFile(file.uri);

  const keys = ArrayBuffer.isView(masterPasswordOrCompositeKey)
    ? masterPasswordOrCompositeKey
    : [await createPasswordKey(masterPasswordOrCompositeKey)];

  return await readKdbxFile(keys, bytes);
}

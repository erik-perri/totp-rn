import {NativeModules} from 'react-native';

export type NativeFile = {
  name?: string;
  uri: string;
};

const {FilesystemModule} = NativeModules as {
  FilesystemModule: {
    createDocumentFile: (
      defaultFileName: string,
      mimeType: string,
    ) => Promise<NativeFile | null>;
    deleteDocumentFile: (uri: string) => Promise<void>;
    getInternalFile: (fileName: string) => Promise<NativeFile>;
    openDocumentFile: (mimeType: string) => Promise<NativeFile | null>;
    readFile: (uri: string) => Promise<number[]>;
    writeFile: (uri: string, data: number[]) => Promise<void>;
  };
};

export async function createDocumentFile(
  defaultFileName: string,
  mimeType: string,
): Promise<NativeFile | null> {
  return await FilesystemModule.createDocumentFile(defaultFileName, mimeType);
}

export async function deleteDocumentFile(uri: string): Promise<void> {
  await FilesystemModule.deleteDocumentFile(uri);
}

export async function getInternalFile(fileName: string): Promise<NativeFile> {
  return await FilesystemModule.getInternalFile(fileName);
}

export async function openDocumentFile(
  mimeType: string,
): Promise<NativeFile | null> {
  return await FilesystemModule.openDocumentFile(mimeType);
}

export async function readFile(uri: string): Promise<Uint8Array> {
  const data = await FilesystemModule.readFile(uri);

  return Uint8Array.from(data);
}

export async function writeFile(uri: string, data: Uint8Array): Promise<void> {
  await FilesystemModule.writeFile(uri, Array.from(data));
}

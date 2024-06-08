import {jest} from '@jest/globals';

const ClipboardMock = {
  getString: jest.fn<() => Promise<string>>().mockResolvedValue('mockString'),
  getImagePNG: jest.fn(),
  getImageJPG: jest.fn(),
  setImage: jest.fn(),
  setString: jest.fn(),
  hasString: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
  hasImage: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
  hasURL: jest.fn<() => Promise<boolean>>().mockResolvedValue(true),
  addListener: jest.fn(),
  removeAllListeners: jest.fn(),
  getEnforcing: jest.fn(),
};

const useClipboard = jest.fn(() => ['mockString', jest.fn()]);

const RNCClipboardMock = {
  ...ClipboardMock,
  useClipboard,
};

export default RNCClipboardMock;

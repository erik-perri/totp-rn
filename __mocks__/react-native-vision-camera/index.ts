import {jest} from '@jest/globals';

const useCameraPermission = jest.fn(() => ({
  hasPermission: true,
  requestPermission: jest.fn(() => Promise.resolve(true)),
}));

export {useCameraPermission};

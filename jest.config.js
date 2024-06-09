const transformIgnores = [
  '@fortawesome/react-native-fontawesome',
  '@react-native',
  '@react-navigation',
  'react-native',
];

module.exports = {
  preset: 'react-native',
  setupFiles: [
    './__mocks__/jest.setup.ts',
    './node_modules/react-native-gesture-handler/jestSetup.js',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!' + transformIgnores.join('|') + ')',
  ],
};

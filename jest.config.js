const ignoredPackages = [
  '@fortawesome/react-native-fontawesome',
  '@react-native',
  'react-native',
];

module.exports = {
  preset: 'react-native',
  setupFiles: ['./__mocks__/jest.setup.ts'],
  transformIgnorePatterns: [
    'node_modules/(?!' + ignoredPackages.join('|') + ')',
  ],
};

const ignoredPackages = [
  '@fortawesome/react-native-fontawesome',
  '@react-native',
  'react-native',
];

module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!' + ignoredPackages.join('|') + ')',
  ],
};

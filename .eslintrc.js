module.exports = {
  root: true,
  extends: [
    '@react-native',
    'eslint:recommended',
    'plugin:@typescript-eslint/strict-type-checked',
  ],
  ignorePatterns: ['node_modules', 'android', 'ios'],
  overrides: [
    {
      files: ['*.js'],
      extends: ['plugin:@typescript-eslint/disable-type-checked'],
    },
  ],
  plugins: [
    '@typescript-eslint',
    'simple-import-sort',
    'react-native-unistyles',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: true,
    tsconfigRootDir: __dirname,
  },
  rules: {
    'no-void': 0,
    'react-native-unistyles/no-unused-styles': 'error',
    'react-native-unistyles/sort-styles': 'error',
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
};

module.exports = {
  extends: 'universe',
  parser: '@typescript-eslint/parser',
  env: {
    'react-native/react-native': true,
  },
  plugins: ['react-hooks', 'react-native', 'prettier'],
  rules: {
    'no-use-before-define': 'off',
    'react/jsx-filename-extension': 'off',
    'prettier/prettier': [
      'warn',
      {
        endOfLine: 'auto',
      },
    ],
    'react/prop-types': 'off',
    'comma-dangle': 'off',
    'object-curly-newline': 'off',
    'no-trailing-spaces': 'off',
    'no-else-return': 'off',
    'no-console': 'off',
    'no-unused-vars': 'off',
    'react/jsx-props-no-spreading': 'off',
  },
};

modules.exports = {
  extends: ['airbnb', 'prettier', 'plugin:node/recommended'],
  plugins: ['prettier'],
  parser: "babel-eslint",
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: false,
    codeFrame: false,
  },
  env: {
    browser: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': ['error'],
    'no-console': 2,
    'no-debugger': 'error',
    'no-alert': 'error',
    'default-case': 'error',
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'prefer-promise-reject-errors': ['off'],
    'no-return-assign': ['off'],
  },
};

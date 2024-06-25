module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    '@react-native-community',
    'plugin:react/recommended',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    NodeJS: true,
    SharedArrayBuffer: 'readonly'
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'simple-import-sort',
    'sort-keys-fix',
    'unused-imports',
    'typescript-sort-keys'
  ],
  root: true,
  rules: {
    'comma-dangle': ['error', 'never'],
    'no-console': 2,
    'no-extra-boolean-cast': 0,
    'react/jsx-curly-brace-presence': [
      1,
      { children: 'never', props: 'never' }
    ],
    'react/jsx-sort-props': [
      'error',
      {
        ignoreCase: true
      }
    ],
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    semi: 0,
    'simple-import-sort/exports': 'warn',
    'simple-import-sort/imports': 'warn',
    'sort-keys-fix/sort-keys-fix': 'warn',
    'typescript-sort-keys/interface': 'warn',
    'typescript-sort-keys/string-enum': 'warn'
  }
}

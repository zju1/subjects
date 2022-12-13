module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['plugin:react/recommended', 'plugin:json/recommended', 'google'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', 'json', '@typescript-eslint'],
  rules: {
    quotes: ['error', 'single'],
    indent: ['error', 2],
    'no-multi-spaces': ['error'],
    semi: ['error', 'always'],
    'react/prop-types': 'off',
    'max-len': 0,
    'quote-props': ['error', 'as-needed'],
    'linebreak-style': 0,
  },
};

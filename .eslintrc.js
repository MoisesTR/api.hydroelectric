module.exports = {
  root: true,
  env: {
    es2020: true,
    node: true,
  },
  parser: '@typescript-eslint/parser',
  extends: ['airbnb-typescript/base', 'plugin:prettier/recommended'],
  plugins: ['@typescript-eslint', 'prettier'],
  parserOptions: {
    project: './tsconfig.eslint.json',
    ecmaVersion: 11,
  },
  rules: {
    'no-console': 'warn',
    'class-methods-use-this': ['error', { exceptMethods: [] }],
    'no-param-reassign': ['off'],
  },
};

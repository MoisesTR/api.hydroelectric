module.exports = {
    env: {
        browser: true,
        es2020: true
    },
    extends: [
        'airbnb-base',
        'plugin:import/errors',
        'plugin:import/warnings',
        'plugin:import/typescript',
        'prettier/@typescript-eslint',
        'plugin:prettier/recommended'
    ],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 11,
        sourceType: 'module'
    },
    plugins: ['@typescript-eslint'],
    rules: {
        'class-methods-use-this': 'off',
        'prettier/prettier': 'error',
        'no-console': 'off',
        'no-unused-vars': ['warn'],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                js: 'never',
                ts: 'never'
            }
        ]
    }
};

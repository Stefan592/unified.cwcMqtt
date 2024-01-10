/* eslint-env node */

module.exports = {
    env: {
        'browser': true,
        'es6': true,
        'node': true,
    },
    extends: [
        'eslint:recommended', 
        'plugin:@stylistic/disable-legacy',
    ],
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        '@stylistic/ts',
    ],
    root: true,
    rules:{
        '@stylistic/ts/indent': ['error', 4],
        semi: 'error',
        quotes: ['error', 'single', {'allowTemplateLiterals': true }]
    }
};


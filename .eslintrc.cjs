module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true,
        node: true,
    },
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true
        },
    },
    settings: {
        react: {
            version: 'detect'
        },
        'import/resolver': {
            typescript: {
                project: ['./tsconfig.json', './tsconfig.node.json'],
            },
        },
    },
    plugins: ['@typescript-eslint', 'react', 'react-hooks', 'jsx-a11y', 'import'],
    extends: [
        'eslint:recommended',
        'plugin:react/recommended',
        'plugin:react/jsx-runtime',
        'plugin:@typescript-eslint/recommended',
        'plugin:jsx-a11y/recommended',
        'plugin:import/recommended',
        'plugin:import/typescript',
    ],
    ignorePatterns: ['dist', 'node_modules'],
    rules: {
        indent: ['error', 4, {
            SwitchCase: 1,
            flatTernaryExpressions: false
        }],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        quotes: [
            'error',
            'single',
            {
                avoidEscape: true,
                allowTemplateLiterals: true
            },
        ],
        semi: ['error', 'never'],
        'no-extra-semi': 'error',
        'react/jsx-curly-brace-presence': [
            'error',
            {
                props: 'always',
                propElementValues: 'always',
                children: 'ignore'
            },
        ],
        'jsx-quotes': ['error', 'prefer-single'],
        'react/jsx-curly-spacing': 'off',
        'func-style': ['error', 'expression', {
            allowArrowFunctions: true
        }],
        'prefer-arrow-callback': ['error', {
            allowNamedFunctions: false
        }],
        'arrow-body-style': 'off',
        'object-property-newline': 'off',
        'object-curly-newline': 'off',
        'object-curly-spacing': ['error', 'always', {
            arraysInObjects: true,
            objectsInObjects: true
        }],
        'react/jsx-max-props-per-line': ['error', {
            maximum: 1,
            when: 'always'
        }],
        'react/jsx-first-prop-new-line': ['error', 'multiline-multiprop'],
        'react/jsx-closing-bracket-location': ['error', 'tag-aligned'],
        'react/jsx-one-expression-per-line': ['error'],
        'react/react-in-jsx-scope': 'off',
        'react/prop-types': 'off',
        '@typescript-eslint/no-unused-vars': [
            'warn',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_',
                caughtErrorsIgnorePattern: '^_',
            },
        ],
        '@typescript-eslint/ban-ts-comment': [
            'warn',
            {
                'ts-ignore': 'allow-with-description'
            },
        ],
        'react-hooks/rules-of-hooks': 'error',
        'react-hooks/exhaustive-deps': 'off',
        eqeqeq: ['error', 'smart'],
        curly: ['error', 'all'],
        'no-console': ['warn', {
            allow: ['warn', 'error']
        }],
        'no-debugger': 'error',
        'no-shadow': 'error',
        'no-duplicate-imports': 'error',
        'object-shorthand': ['error', 'always'],
        'prefer-const': ['error', {
            destructuring: 'all'
        }],
        'no-var': 'error',
        'import/order': [
            'warn',
            {
                groups: [
                    'builtin',
                    'external',
                    'internal',
                    ['parent', 'sibling', 'index'],
                    'type',
                ],
                'newlines-between': 'always',
                alphabetize: {
                    order: 'asc',
                    caseInsensitive: true
                },
            },
        ],
        'import/no-unresolved': 'error',
        'import/newline-after-import': 'warn',
    },
}

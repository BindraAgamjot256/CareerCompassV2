// eslint.config.cjs
const globals = require('globals');
const typescript = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const react = require('eslint-plugin-react');
const reactHooks = require('eslint-plugin-react-hooks');
const prettier = require('eslint-plugin-prettier');

module.exports = [
  // Base configuration for all files
  {
    files: ['**/*.{js,jsx,ts,tsx,cjs,mjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
        ...globals.node,
        // Tauri-specific globals
        __TAURI__: 'readonly',
        Uint8Array: 'readonly',
        Uint16Array: 'readonly',
        Uint32Array: 'readonly',
        Int8Array: 'readonly',
        Int16Array: 'readonly',
        Int32Array: 'readonly',
        Float32Array: 'readonly',
        Float64Array: 'readonly',
        BigInt64Array: 'readonly',
        BigUint64Array: 'readonly',
        DataView: 'readonly',
        ArrayBuffer: 'readonly',
      },
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      '@typescript-eslint': typescript,
      'react': react,
      'react-hooks': reactHooks,
      'prettier': prettier,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { 
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      }],

      // React rules
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // General rules
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'prettier/prettier': ['error', {
        singleQuote: true,
        semi: true,
        tabWidth: 2,
        trailingComma: 'es5',
        printWidth: 80,
        bracketSpacing: true,
        arrowParens: 'avoid',
      }],
    },
  },
  // Override for TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    rules: {
      'no-undef': 'off', // TypeScript handles this
    },
  },
  // Specific configuration for Tauri-related files
  {
    files: ['src-tauri/**/*.rs'], // For Rust files
    ignores: ['src-tauri/target/**'],
  },
  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      'build/**',
      '.tauri/**',
      'src-tauri/**',
          ],
  },
];

module.exports = {
  root: true,
  env: { browser: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:react-hooks/recommended'],
  ignorePatterns: ['dist', 'dev-dist', '.eslintrc.cjs'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: { jsx: true },
  },
  settings: { react: { version: 'detect' } },
  plugins: ['react', 'react-refresh'],
  rules: {
    // Without these, no-unused-vars cannot see identifiers used only in JSX.
    // (The TypeScript parser used to resolve that for us.)
    'react/jsx-uses-react': 'error',
    'react/jsx-uses-vars': 'error',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
  },
}

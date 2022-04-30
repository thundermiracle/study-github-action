module.exports = {
  extends: [
    'plugin:@web-configs/node',
    'plugin:@web-configs/typescript',
    'plugin:@web-configs/jest',
    'plugin:@web-configs/prettier',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'jest/expect-expect': 'off',
    '@typescript-eslint/naming-convention': 'off',
  },
};

module.exports = {
  extends: [
    'plugin:@web-configs/node',
    'plugin:@web-configs/typescript',
    'plugin:@web-configs/jest',
    'plugin:@web-configs/prettier',
    'plugin:@web-configs/github',
  ],
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'jest/expect-expect': 'off',
    'eslint-comments/no-use': 'off',
  },
};

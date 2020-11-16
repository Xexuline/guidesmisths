// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  env: {
    browser: true,
  },
  extends: ['airbnb-base'],
  plugins: [
    'jest',
  ],
  env: {
    node: true,
    'jest/globals': true,
  },
  rules: {
    'linebreak-style': 0, //deshabilitar solo LF
    'no-console': 0, //permitir console.logs
    'prefer-destructuring': 0,
    'no-underscore-dangle': 0,
  }
}

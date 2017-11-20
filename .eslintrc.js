module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module',
    ecmaFeatures: {
      classes: true
    },
  },
  parser: 'babel-eslint',
  extends: 'eslint:recommended',
  env: {
    browser: true
  },
  rules: {
    strict: 0
  }
};

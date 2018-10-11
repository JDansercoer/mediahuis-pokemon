module.exports = {
  extends: 'airbnb',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  rules: {
    'arrow-parens': ['error', 'as-needed'],
    'arrow-body-style': 0,
    'react/jsx-filename-extension': 0,
    'implicit-arrow-linebreak': 0,
  },
};

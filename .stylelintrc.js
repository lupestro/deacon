'use strict';

module.exports = {
  extends: ['stylelint-config-standard', 'stylelint-prettier/recommended'],
  rules: {
    'prettier/prettier': [
      true,
      {
        singleQuote: true,
        endOfLine: 'auto',
      },
    ],
  },
};

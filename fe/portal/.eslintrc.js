module.exports = {
  "env": {
    "browser": true,
    "es2020": true,
    "node": true,
    "jest": true
  },
  "extends": [
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "jsx": true
    },
    "ecmaVersion": 11,
    "sourceType": "module"
  },
  "plugins": [
    "react"
  ],
  "rules": {
    "indent": [
      "warn",
      2,
      {
        "SwitchCase": 1
      }
    ],
    "quotes": [
      "error",
      "single"
    ],
    "semi": [
      "error",
      "never"
    ],
    "no-prototype-builtins": 0,
    "no-var": 1,
    "react-hooks/exhaustive-deps": 0,
    "react/prop-types": 0,
    "no-unused-vars": 0,
    "react/display-name": 0,
    "eqeqeq": 1,
    "no-useless-escape": 0,
    "no-empty": 0
  }
};

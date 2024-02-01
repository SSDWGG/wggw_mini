module.exports = {
  extends: ['alloy', 'alloy/vue', 'alloy/typescript', 'prettier'],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: {
      js: '@babel/eslint-parser',
      jsx: '@babel/eslint-parser',

      ts: '@typescript-eslint/parser',
      tsx: '@typescript-eslint/parser',

      // Leave the template parser unspecified, so that it could be determined by `<script lang="...">`
    },
  },
  env: {
    // Your environments (which contains several predefined global variables)
    //
    browser: true,
    node: true,
    // mocha: true,
    // jest: true,
    // jquery: true
  },
  globals: {
    // Your global variables (setting to false means it's not allowed to be reassigned)
    wx: "readonly",
    defineAppConfig: "readonly",
    definePageConfig: "readonly", // https://github.com/typescript-eslint/typescript-eslint/blob/main/docs/linting/TROUBLESHOOTING.md#i-get-errors-from-the-no-undef-rule-about-global-variables-not-being-defined-even-though-there-are-no-typescript-errors
    TransformReact2VueType: "readonly",
  },
  ignorePatterns: ["node_modules", ".eslintrc.js", "dist", "config", "babel.config.js"],
  rules: {
    // for prettier 不使用 prettier 插件，直接 eslint 定义
    "semi": ["warn", "always", { "omitLastInOneLineBlock": true}],
    "quotes": ["warn", "single"],
    "camelcase": ["error", {"ignoreImports": true, "ignoreDestructuring": true }],
    "arrow-body-style": ["error", "as-needed"],
    "consistent-return": "warn",
    "class-methods-use-this": "warn",
    "default-case": "warn",
    "default-param-last": "error",
    "dot-notation": "error",
    "max-lines": ["error", 1000],
    "max-lines-per-function": ["error", { "max": 200 }],
    "no-console": "warn",
    "no-delete-var": "error",
    "no-div-regex": 'error',
    "no-dupe-args": "error",
    "no-duplicate-imports": ["warn", { "includeExports": true }],
    "no-empty-function": "error",
    "no-lonely-if": "error",
    "no-multi-assign": "error",
    "no-octal": "error",
    "no-redeclare": "error",
    "no-shadow": "warn",
    "no-useless-return": "error",
    "prefer-const": "error",
    "prefer-template": "error",
    "prefer-rest-params": "warn",
    "prefer-spread": "warn",
    "require-await": "error",
    "max-len": ["warn", {
      "code": 300,
      "tabWidth": 2,
    }],
    // Customize your rules
    "eqeqeq": ["error", "always"],
    "no-constant-condition": ["error", {
      "checkLoops": false
    }],
    "no-empty-pattern": "error",
    "no-implied-eval": "error",
    "no-sparse-arrays": "error",
    "no-throw-literal": "error",
    "no-unused-vars": ["error", {
      "vars": "all",
      "args": "none",
      "ignoreRestSiblings": false,
      "caughtErrors": "none"
    }],
    "no-useless-concat": "error",
    // Please keep this rule off because it requiresTypeChecking
    // https://github.com/vuejs/vue-eslint-parser/issues/104
    // https://github.com/typescript-eslint/typescript-eslint/pull/5318
    '@typescript-eslint/prefer-optional-chain': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
  },
};
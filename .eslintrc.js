module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
  },
  extends: ["eslint:recommended", "plugin:import/recommended", "prettier"],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
  },
  rules: {
    "import/no-unresolved": [2, { commonjs: true, amd: true }],
  },
};

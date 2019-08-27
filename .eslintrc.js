module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-useless-escape": 0,
    "no-unused-vars": "error",
    "no-unused-vars": 0
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

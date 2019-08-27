module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  rules: {
    "no-console": "off",
    "no-useless-escape": 0,
    "no-unused-vars": 0,
    // 强制在 function的左括号之前使用一致的空格
    "space-before-function-paren": [0, "always"]
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};

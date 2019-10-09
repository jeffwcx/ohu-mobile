
/**
 * @typedef { import("eslint").Linter.Config } Config
 */

/**
 * @type {Config}
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential"],
  plugins: ["@typescript-eslint"],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": ["error", "single"],
    "jsx-quotes": ["error", "prefer-double"],
    "@typescript-eslint/indent": ["error",  2],
    "@typescript-eslint/class-name-casing": ["error", { allowUnderscorePrefix: false }]
  },
  parserOptions: {
    parser: "@typescript-eslint/parser"
  },
  overrides: [
    {
      files: ["**/__tests__/*.{j,t}s?(x)"],
      env: {
        jest: true
      }
    }
  ]
};

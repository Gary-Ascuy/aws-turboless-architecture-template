module.exports = {
  root: true,
  extends: ["custom"], // use `eslint-config-custom`
  settings: {
    next: { rootDir: ["services/*/"] },
  },
  rules: {
    "@typescript-eslint/require-await": "off",
  }
};

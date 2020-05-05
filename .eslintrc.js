module.exports = {
  extends: ["clarity/react-typescript", "plugin:import/typescript"],
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: "module",
    project: "./tsconfig.json",
  },
  settings: {
    "import/parsers": {
      "@typescript-eslint/parser": [".ts", ".tsx"],
    },
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  rules: {
    "new-cap": "off",
    "import/no-unassigned-import": ["error", { allow: ["reflect-metadata"] }],
  },
};

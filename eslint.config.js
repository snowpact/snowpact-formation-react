import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginPrettier from "eslint-plugin-prettier/recommended";

const plugins = {
  plugins: {
    prettier: eslintPluginPrettier
  },
  rules: {
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "error",
    "react/react-in-jsx-scope": "off",
    "prettier/prettier": "error",
  },
};
const config = [
  {
    files: ["src/**/*.{js,mjs,cjs,ts,jsx,tsx}"],
  },
  {
    settings: {
      react: {
        version: "detect",
      },
    },
    languageOptions: { globals: globals.browser },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  prettier,
  plugins,
  {
    ignores: [
      "src/components/ui/*",
      "src/vite/**/*",
      "build/**/*",
      "deploy/**/*",
      "scripts/**/*",
      "src/router.ts",
    ],
  },
];

export default config;
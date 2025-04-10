import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import prettier from "eslint-plugin-prettier";
import securityPlugin from "eslint-plugin-security";
import unicornPlugin from "eslint-plugin-unicorn";
import globals from "globals";
import tsPlugin from "typescript-eslint";

export default defineConfig([
  // Security
  securityPlugin.configs.recommended,
  {
    files: ["**/*.ts"],
  },
  {
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    rules: {
      "func-style": ["error", "expression"],
      "no-restricted-syntax": ["off", "ForOfStatement"],
    },
  },
  {
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    plugins: {
      js,
      prettier,
      securityPlugin,
      unicornPlugin,
      tsPlugin,
    },
    extends: [
      js.configs.recommended,
      "plugin:prettier/recommended",
      "plugin:security/recommended",
      "plugin:unicorn/recommended",
      "plugin:prettier/recommended",
    ],
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "no-console": "warn",
    },
  },
]);

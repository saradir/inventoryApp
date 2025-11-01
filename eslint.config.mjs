// eslint.config.mjs
import js from "@eslint/js";
import standard from "eslint-config-standard";
import prettierPlugin from "eslint-plugin-prettier";
import prettierConfig from "eslint-config-prettier";

/** @type {import("eslint").Linter.FlatConfig[]} */
export default [
  // 1️⃣ Ignore unnecessary folders
  {
    ignores: ["node_modules", "dist", "public", "coverage"],
  },

  // 2️⃣ Base JS config (recommended rules)
  js.configs.recommended,

  // 3️⃣ Your main project rules
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module", // change to "script" if you use require() instead of import
      globals: {
        // Express globals
        process: "readonly",
        __dirname: "readonly",
        require: "readonly",
        module: "readonly",
        exports: "readonly",
      },
    },
    plugins: {
      prettier: prettierPlugin,
    },
    rules: {
      // Combine Standard & Prettier
      ...standard.rules,
      ...prettierConfig.rules,

      // Prettier integration: show formatting issues as ESLint errors
      "prettier/prettier": "error",

      // Optional Express-related style rules
      "no-unused-vars": ["warn", { argsIgnorePattern: "next" }], // ignore Express's `next`
      "no-console": "off", // allow console.log in backend
    },
  },
];

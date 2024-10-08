import globals from "globals";
import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import reactRefreshPlugin from "eslint-plugin-react-refresh";
import tailwindcssPlugin from "eslint-plugin-tailwindcss";

export default [
  {
    ignores: ["**/dist/**"],
  },
  {
    files: ["**/*.{js,jsx,ts,tsx}", "*.{js,jsx,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
      },
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    plugins: {
      react: reactPlugin,
      "react-hooks": reactHooksPlugin,
      "react-refresh": reactRefreshPlugin,
      tailwindcss: tailwindcssPlugin, // Add this line
    },
    rules: {
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],
      ...reactHooksPlugin.configs.recommended.rules,
      "react/boolean-prop-naming": [
        "error",
        {
          rule: "^(is|has)[A-Z]([A-Za-z0-9]?)+",
          message:
            "Boolean prop '{{propName}}' should start with 'is' or 'has'",
        },
      ],
      // Add Tailwind CSS rules
      ...tailwindcssPlugin.configs.recommended.rules,
    },
    settings: {
      react: {
        version: "detect",
      },
      tailwindcss: {
        // These are the default values but can be customized if needed
        callees: ["classnames", "clsx", "ctl"],
        config: "tailwind.config.js",
        cssFiles: [
          "**/*.css",
          "!**/node_modules",
          "!**/.*",
          "!**/dist",
          "!**/build",
        ],
        groupByResponsive: true,
        prependCustom: true,
        removeDuplicates: true,
        whitelist: [],
      },
    },
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
];

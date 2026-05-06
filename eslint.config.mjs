import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  // it is for tanstack form, which is used in the signup form component. It allows us to use the children prop in the form.field component, which is not allowed by default in eslint-config-next.
  {
    rules: {
      "react/no-children-prop": [
        true,
        {
          allowFunctions: true,
        },
      ],
    },
  },
]);

export default eslintConfig;

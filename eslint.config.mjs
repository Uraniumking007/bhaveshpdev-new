import astro from 'eslint-plugin-astro';

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  // Recommended rules for Astro files and related JS/TS
  ...astro.configs['flat/recommended'],
  {
    rules: {
      // Place project-specific rule overrides here as needed
    },
  },
];

import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginVue from 'eslint-plugin-vue';
import vueConfigPrettier from '@vue/eslint-config-prettier';
import {
  defineConfigWithVueTs,
  vueTsConfigs,
} from '@vue/eslint-config-typescript';
import tseslint from 'typescript-eslint';

export default defineConfigWithVueTs([
  {
    ignores: ['node_modules', 'dist'],
  },
  // JavaScript base config
  pluginJs.configs.recommended,
  // TypeScript base config
  ...tseslint.configs.recommended,
  // Vue plugin with flat config (for Vue 3)
  ...pluginVue.configs['flat/recommended'],
  // TypeScript config (enables parser, rules for .ts in Vue)
  vueTsConfigs.recommended,
  // Prettier integration: disables conflicting rules
  vueConfigPrettier,
  // Prettier and custom rules
  {
    rules: {
      'prettier/prettier': 'warn',
      'vue/html-closing-bracket-newline': [
        'error',
        {
          singleline: 'never',
          multiline: 'never',
        },
      ],
      'vue/max-attributes-per-line': 'off',
      'vue/no-v-html': 'off',
      'max-len': 'off',
      'linebreak-style': 'off',
      'vue/multi-word-component-names': 'off',
      'vue/first-attribute-linebreak': 'off',
    },
    files: ['*.js', '*.ts', '*.vue', '**/*.js', '**/*.ts', '**/*.vue'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
]);

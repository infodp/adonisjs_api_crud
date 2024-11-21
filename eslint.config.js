import { configApp } from '@adonisjs/eslint-config'

export default {
  ...configApp(),
  rules: {
    '@typescript-eslint/no-empty-function': 'off', // Permitir funciones vacías
    '@typescript-eslint/explicit-function-return-type': 'off', // No exigir tipo de retorno
  }
}

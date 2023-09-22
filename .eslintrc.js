module.exports = {
  globals: {
    dataform: 'readonly',
    utils: 'readonly',
    publish: 'readonly',
    operation: 'readonly',
    operate: 'readonly',
    declare: 'readonly',
    assert: 'readonly',
    test: 'readonly',
    constants: 'readonly',
    monitoring: 'readonly',
  },
  extends: [
    'airbnb-base',
    'eslint:recommended',
  ],
  rules: {
    semi: ['error', 'never'],
    'no-unused-vars': ['error', { vars: 'local', args: 'none', ignoreRestSiblings: true }],
    'newline-before-return': 'error',
    'no-global-assign': ['error', { exceptions: ['Object'] }],
    'no-use-before-define': ['error', { functions: false, classes: true, variables: true }],
  },
}

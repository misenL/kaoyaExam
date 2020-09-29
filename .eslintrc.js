module.exports = {
  root: true,
  env: {
    node: true
  },
  'extends': [
    'plugin:vue/essential',
    '@vue/standard',
    'eslint:recommended'
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-tabs': 0,
    'no-unreachable': [ // 不允许在 return, throw, break添加代码
      'error'
    ],
    'spaced-comment': [ // 注释后预留空格
      'error',
      'always'
    ],
    'space-before-function-paren': [ // 括号与函数名加空格
      'error', 'always'
    ],
    'eqeqeq': [ // 使用 ===
      'error', 'always' 
    ],
    'space-infix-ops': [ // 拼接字符串预留空格
      'error', {
          'int32Hint':false
      }
    ],
    'no-multiple-empty-lines': [ // 最大空行数
      'error', {
      'max': 2
      }
    ],
    'block-spacing': [ // 大括号两边预留空格
      'error',
      'always'
    ],
    'comma-spacing': [ // 逗号前后的空格
      2, {
        'before': false,
        'after': true
      }],
    'quotes': [
      'error',
      'single' // 强制使用单引号
    ],
    'no-extra-semi': 'error', // 禁止使用分号
    'semi-spacing': [ // 分号前后空格
      'error',
      {
        'before': false,
        'after': true
      }
    ]
  },
  parserOptions: {
    parser: 'babel-eslint'
  }
}

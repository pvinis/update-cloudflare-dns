/* eslint-disable no-unused-vars */
var OFF = 0
var WARN = 1
var ERR = 2
/* eslint-enable no-unused-vars */


module.exports = {
	root: true,

	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'jest'],

	env: { 'jest/globals': true },

	rules: {
		semi: [ERR, 'never'], // we dont like semis around here
		quotes: [ERR, 'single'], // why not single quotes?
		indent: [ERR, 'tab'], // use tabs
		'comma-dangle': [ERR, 'always-multiline'], // always dangling commas for multiline
		'no-multiple-empty-lines': [ERR, { max: 2 }], // sometimes we like 2 empty lines as separator
		'no-extra-parens': [ERR], // clean up unnecessary parens

		//decadejs: switch cases should be indented?
		'object-curly-spacing': [ERR, 'always'],
		'key-spacing': ERR,
		'arrow-spacing': ERR,
		'no-multi-spaces': [ERR, { ignoreEOLComments: true }], // has exceptions too, if needed
		'comma-spacing': ERR,
		'no-unused-vars': [ERR, { argsIgnorePattern: '^_' }],

		// imports
		'import/newline-after-import': [ERR, { count: 2 }],
		'import/order': [
			ERR,
			{
				groups: [
					['builtin', 'external'],
					'internal',
					['sibling', 'parent', 'index'],
				],
				'newlines-between': 'always',
			},
		],
	},
}

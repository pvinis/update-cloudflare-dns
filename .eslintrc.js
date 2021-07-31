/* eslint-disable @typescript-eslint/no-unused-vars  */
var OFF = 0
var WARN = 1
var ERR = 2
/* eslint-enable @typescript-eslint/no-unused-vars */


module.exports = {
	root: true,

	env: {
		node: true,
		es6: true,
		'jest/globals': true,
	},

	parser: '@typescript-eslint/parser', // typescript support
	parserOptions: { sourceType: 'module' },
	plugins: [
		'import', // import ordering
		'@typescript-eslint', // typescript support
		'jest',
	],
	extends: [
		'eslint:recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
		'plugin:import/typescript',
		'plugin:@typescript-eslint/recommended', // recommended rules for typescript
	],

	rules: {
		// formatting
		semi: OFF, // overridden
		'@typescript-eslint/semi': [ERR, 'never'], // we dont like semis around here
		quotes: OFF, // overridden
		'@typescript-eslint/quotes': [ERR, 'single'], // why not single quotes?
		indent: [ERR, 'tab', { SwitchCase: 1 }], // use tabs, also switch cases should be indented
		'comma-dangle': OFF, // overridden
		'@typescript-eslint/comma-dangle': [ERR, 'always-multiline'], // always dangling commas for multiline
		'no-multiple-empty-lines': [ERR, { max: 2 }], // sometimes we like 2 empty lines as separator
		'no-extra-parens': OFF, // overridden
		'@typescript-eslint/no-extra-parens': ERR, // clean up unnecessary parens
		'space-infix-ops': OFF, // overridden
		'@typescript-eslint/space-infix-ops': [ERR, { 'int32Hint': false }],

		// help with possible bugs
		// '@typescript-eslint/await-thenable': ERR, // make sure we dont use await when we shouldnt
		'@typescript-eslint/adjacent-overload-signatures': ERR, // put all overloads types of a func close together
		'@typescript-eslint/no-inferrable-types': OFF, // let us be more explicit if we want
		// '@typescript-eslint/promise-function-async': ERR, // if we mess with promised, better have the async/await to match
		// "require-await": OFF, // overridden
		// "@typescript-eslint/require-await": ERR, // if we mess with promised, better have the async/await to match
		// '@typescript-eslint/switch-exhaustiveness-check':ERR, // make sure our switches are complete


		//decadejs: switch cases should be indented?
		'object-curly-spacing': [ERR, 'always'],
		'key-spacing': ERR,
		'arrow-spacing': ERR,
		'no-multi-spaces': [ERR, { ignoreEOLComments: true }], // has exceptions too, if needed
		'comma-spacing': ERR,
		'no-unused-vars': OFF, // overridden
		'@typescript-eslint/no-unused-vars': [ERR, { argsIgnorePattern: '^_' }],

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

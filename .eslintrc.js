/* eslint-disable no-unused-vars */
var OFF = 0
var WARN = 1
var ERR = 2
/* eslint-enable no-unused-vars */

module.exports = {
	root: true,

	parser: '@typescript-eslint/parser',
	plugins: ['@typescript-eslint', 'jest'],
	// extends: ['@decadejs/eslint-config-base'],

	env: { 'jest/globals': true },

	rules: {
		'no-unused-vars': [ERR, { argsIgnorePattern: '^_' }],
		// move this to decadejs
	},
}

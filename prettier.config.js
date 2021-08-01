module.exports = {
	useTabs: true,
	semi: false,
	singleQuote: true,
	trailingComma: 'es5',
	overrides: [
		{
			files: ['*.ts'],
			options: {
				parser: 'typescript',
			},
		},
	],
}

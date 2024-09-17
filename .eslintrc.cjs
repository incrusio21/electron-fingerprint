module.exports = {
    extends: [
		'eslint:recommended',
        'plugin:react/recommended',
		'plugin:react/jsx-runtime',
		'@electron-toolkit/eslint-config-ts/recommended',
        '@electron-toolkit/eslint-config-prettier'
	],
    plugins: ['@stylistic'],
    rules: {
        '@stylistic/indent': ['error', 'tab', 4],
		'@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-unused-vars': 'off',
		'@typescript-eslint/no-this-alias': [
			'error',
			{
                allowedNames: ['me']
			}
		]
	}
}

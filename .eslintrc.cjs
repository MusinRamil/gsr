module.exports = {
	root: true,
	env: {
		browser: true,
		node: true,
	},
	parser: 'vue-eslint-parser',
	parserOptions: {
		parser: '@typescript-eslint/parser',
	},
	extends: ['@nuxt/eslint-config', 'plugin:prettier/recommended'],
	plugins: [],
	rules: {
		'no-useless-escape': 'off',
		'@typescript-eslint/no-unused-vars': 'off',
		'vue/multi-word-component-names': 'off',
		'vue/no-multiple-template-root': 'off',
	},
};

// @ts-check
/// <reference types="@prettier/plugin-pug/src/prettier" />

/**
 * @type {import('prettier').Options}
 */
export default {
	plugins: ['@prettier/plugin-pug'],

	bracketSpacing: true,
	singleQuote: true,
	useTabs: true,
	semi: true,
	tabWidth: 4,
	printWidth: 100,
	trailingComma: 'es5',
	arrowParens: 'avoid',

	pugFramework: 'vue',
	pugClassNotation: 'attribute',
	pugIdNotation: 'as-is',
	pugExplicitDiv: true,
};

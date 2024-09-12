import { defineVitestConfig } from '@nuxt/test-utils/config';

export default defineVitestConfig({
	test: {
		globals: true, // https://vitest.dev/config/#globals
		environment: 'happy-dom', // https://vitest.dev/config/#environment
	},
});

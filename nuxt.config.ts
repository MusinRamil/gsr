import { fileURLToPath } from 'url';

export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	css: ['/assets/less/main.less'],

	app: {
		head: {
			htmlAttrs: {
				lang: 'ru',
			},
		},
	},

	vite: {
		vue: {
			script: {
				propsDestructure: true,
			},
		},

		css: {
			preprocessorOptions: {
				less: {
					sourceMap: false,
					additionalData: '', // TODO: add less imports
				},
			},
		},

		plugins: [],

		resolve: {
			alias: {
				'~': fileURLToPath(new URL('./', import.meta.url)),
				'@': fileURLToPath(new URL('./assets', import.meta.url)),
			},
		},

		build: {
			cssMinify: 'lightningcss',
		},
	},

	nitro: {
		compressPublicAssets: { gzip: true, brotli: true },
		timing: false,
	},

	modules: ['nuxt-multi-cache'],

	runtimeConfig: {},

	compatibilityDate: '2024-04-03',
});

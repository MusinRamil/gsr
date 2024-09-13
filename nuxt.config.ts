import { fileURLToPath } from 'url';
import { resolveBooleanEnv } from './utils/resolve-env';

export default defineNuxtConfig({
	devtools: {
		enabled: true,

		timeline: {
			enabled: true,
		},
	},

	css: ['/assets/css/main.css'],

	postcss: {
		plugins: {
			tailwindcss: {},
			autoprefixer: {},
		},
	},

	app: {
		head: {
			htmlAttrs: {
				lang: 'ru',
			},
		},
	},

	vue: {
		propsDestructure: true,
	},

	vite: {
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

	modules: ['nuxt-multi-cache', '@nuxt/test-utils/module', '@nuxt/ui'],

	runtimeConfig: {
		api: {
			baseURL: process.env.NUXT_API_BASE_URL || 'https://gsr-rabota.ru/api/v2',
		},
		public: {
			api: {
				baseURL: process.env.NUXT_PUBLIC_API_BASE_URL || 'https://gsr-rabota.ru/api/v2',
			},
		},
	},

	$production: {
		multiCache: {
			debug: false,
			data: {
				enabled: true,
			},
			component: {
				enabled: true,
			},
			route: {
				enabled: true,
			},
			api: {
				enabled: true,
				authorization: false,
				prefix: process.env.NUXT_MULTI_CACHE_API_PREFIX || '/__nuxt_multi_cache',
			},
		},
	},

	$development: {
		multiCache: {
			debug: resolveBooleanEnv(process.env.NUXT_MULTI_CACHE_DEBUG, false),
			data: {
				enabled: resolveBooleanEnv(process.env.NUXT_MULTI_CACHE_DATA, false),
			},
			component: {
				enabled: resolveBooleanEnv(process.env.NUXT_MULTI_CACHE_COMPONENT, false),
			},
			route: {
				enabled: resolveBooleanEnv(process.env.NUXT_MULTI_CACHE_ROUTE, false),
			},
			api: {
				enabled: true,
				authorization: false,
				prefix: process.env.NUXT_MULTI_CACHE_API_PREFIX || '/__nuxt_multi_cache',
			},
		},
	},

	compatibilityDate: '2024-09-11',
});

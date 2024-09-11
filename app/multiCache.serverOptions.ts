import { defineMultiCacheOptions } from 'nuxt-multi-cache/dist/runtime/serverOptions';
import redisDriver from 'unstorage/drivers/redis';
import { type H3Event, getHeader, getRequestURL } from 'h3';
import { redisOptions } from '~/utils/cache-storage';

export default defineMultiCacheOptions({
	data: {
		storage: {
			driver: redisDriver({
				base: 'data',
				...redisOptions,
			}),
		},
	},

	component: {
		storage: {
			driver: redisDriver({
				base: 'component',
				...redisOptions,
			}),
		},
	},

	route: {
		storage: {
			driver: redisDriver({
				base: 'route',
				...redisOptions,
			}),
		},

		buildCacheKey(event: H3Event) {
			let path = getRequestURL(event).pathname;

			if (path === '/') {
				path = 'main';
			}

			const cacheKeyList = [path];

			const cacheKey = cacheKeyList.join(':');

			return cacheKey;
		},
	},

	enabledForRequest: async (event: H3Event) => {
		const noCacheHeader = getHeader(event, 'x-no-cache');

		if (noCacheHeader === 'true') {
			return false;
		}

		return true;
	},
});

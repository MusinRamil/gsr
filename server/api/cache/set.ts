import redisDriver from 'unstorage/drivers/redis';
import { createStorage } from 'unstorage';
import { defineEventHandler, readBody } from 'h3';
import { redisOptions, cacheTime } from '~/utils/cache-storage';

const storage = createStorage({
	driver: redisDriver({
		base: 'queryCache',
		...redisOptions,
	}),
});

export default defineEventHandler(async event => {
	const body = <{ key: string; data: any; time?: number }>await readBody(event);
	if (!body.key || typeof body.key !== 'string') {
		throw new Error('Invalid cache key');
	}

	await storage.setItem(body.key, body.data, { ttl: body.time ?? cacheTime.day });
});

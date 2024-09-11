import redisDriver from 'unstorage/drivers/redis';
import { createStorage } from 'unstorage';
import { defineEventHandler, getQuery } from 'h3';
import { redisOptions } from '~/utils/cache-storage';

const storage = createStorage({
	driver: redisDriver({
		base: 'queryCache',
		...redisOptions,
	}),
});

export default defineEventHandler(async event => {
	const query = getQuery(event);
	if (typeof query.key !== 'string') {
		throw new Error('Invalid cache key');
	}

	const cachedData = await storage.getItem(query.key);
	return cachedData || null;
});

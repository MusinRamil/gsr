export const cacheTime = {
	minute: 60, // 1 minute
	hour: 60 * 60, // 1 hour
	day: 60 * 60 * 24, // 1 day
	week: 60 * 60 * 24 * 7, // 1 week
};

export const redisOptions = {
	host: process.env.NUXT_REDIS_HOST || '127.0.0.1',
	port: parseInt(process.env.NUXT_REDIS_PORT || '', 10) || 6379,
	db: parseInt(process.env.NUXT_REDIS_DB || '', 10) || 0,
};

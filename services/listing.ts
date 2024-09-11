export const listingService = {
	fetch: async (): Promise<unknown> => {
		const { $api } = useNuxtApp();

		const endpoint = 'Vacancies/All/List';
		const cacheKey = endpoint.split('/').join(':');

		/**
		 * Check if data is in the cache
		 */
		const cachedResponse = await $fetch(`/api/cache/get?key=${cacheKey}`);
		if (cachedResponse) {
			return cachedResponse;
		}

		/**
		 * Fetch data from the API
		 */
		const response = await $api<unknown>(endpoint, {
			method: 'GET',
		});

		/**
		 * Save data to the cache
		 */
		await $fetch(`/api/cache/set`, {
			method: 'POST',
			body: {
				key: cacheKey,
				data: response,
				time: cacheTime.day,
			},
		});

		return response;
	},
};

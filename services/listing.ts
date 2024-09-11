const { $api } = useNuxtApp();

export const listingService = {
	fetchListing: async (): Promise<unknown> => {
		console.log('getListing');

		const response = await $api<unknown>(`Vacancies/All/List`, {
			method: 'GET',
		});
		console.log(response);

		return response;
	},
};

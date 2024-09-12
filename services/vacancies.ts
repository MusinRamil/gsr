import { type Vacancy } from '~/models/vacancies';

export const vacanciesService = {
	fetch: async (): Promise<Vacancy.Model[]> => {
		const { $api } = useNuxtApp();

		const endpoint = 'Vacancies/All/List';
		const cacheKey = endpoint.split('/').join(':');

		/**
		 * Проверяем наличие списка вакансий в кэше
		 */
		const cachedResponse = await $fetch<Vacancy.Model[] | null>(
			`/api/cache/get?key=${cacheKey}`
		);
		if (cachedResponse) {
			return cachedResponse;
		}

		/**
		 * Получаем список вакансий из API
		 */
		const response = await $api<Vacancy.Model[]>(endpoint, {
			method: 'GET',
		});

		/**
		 * Сохраняем список вакансий в кэш
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

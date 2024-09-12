import { vacanciesService } from '~/services/vacancies';

export const useVacanciesStore = () => ({
	vacanciesState: useState<unknown>('vacanciesState', () => []),
	vacanciesLoaded: useState<boolean>('vacanciesLoaded', () => false),
	vacanciesPending: useState<boolean>('vacanciesPending', () => true),
});

export const useVacancies = () => {
	const { vacanciesState, vacanciesLoaded, vacanciesPending } = useVacanciesStore();

	/**
	 * Получаем список вакансий
	 */
	const fetchVacancies = async () => {
		if (vacanciesLoaded.value) return;

		vacanciesPending.value = true;

		vacanciesState.value = await vacanciesService.fetch();

		vacanciesLoaded.value = true;
		vacanciesPending.value = false;
	};

	/**
	 * Обновляем список вакансий
	 */
	const refreshVacancies = async () => {
		vacanciesLoaded.value = false;
		await fetchVacancies();
	};

	return {
		vacanciesState,
		vacanciesLoaded,
		vacanciesPending,

		fetchVacancies,
		refreshVacancies,
	};
};

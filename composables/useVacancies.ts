import { vacanciesService } from '~/services/vacancies';
import type { Vacancy } from '~/models/vacancies';

export const useVacanciesStore = () => ({
	vacanciesState: useState<Vacancy.Model[]>('vacanciesState', () => []),
	vacanciesLoaded: useState<boolean>('vacanciesLoaded', () => false),
	vacanciesPending: useState<boolean>('vacanciesPending', () => true),
});

export const useVacancies = () => {
	const { vacanciesState, vacanciesLoaded, vacanciesPending } = useVacanciesStore();

	/**
	 * Fetch vacancies
	 */
	const fetchVacancies = async () => {
		if (vacanciesLoaded.value) return;

		vacanciesPending.value = true;

		vacanciesState.value = await vacanciesService.fetch();

		vacanciesLoaded.value = true;
		vacanciesPending.value = false;
	};

	/**
	 * Refresh vacancies
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

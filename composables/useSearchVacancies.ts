import itemsjs from 'itemsjs';
import { Vacancy } from '~/models/vacancies';

export const useSearchVacancies = async () => {
	const { getQueryFilters, setQueryFilters } = useQueryString();
	const { vacanciesState, fetchVacancies } = useVacancies();

	await fetchVacancies();
	const searchEngine = itemsjs(vacanciesState.value, {
		sortings: {
			default: {
				field: 'vacancy_id',
				order: 'asc',
			},
			salary_highest: {
				field: 'salary_volume',
				order: 'desc',
			},
			salary_lowest: {
				field: 'salary_volume',
				order: 'asc',
			},
		},
		aggregations: {
			regionname: {
				title: 'Регион',
				size: 500,
				conjunction: false,
			},
			placetitle: {
				title: 'Город',
				size: 500,
				conjunction: false,
			},
			stationname: {
				title: 'Станция метро',
				size: 500,
				conjunction: false,
			},
			directiontitle: {
				title: 'Отрасль',
				size: 500,
				conjunction: false,
			},
			clientname: {
				title: 'Профессия',
				size: 500,
				conjunction: false,
			},
		},
		searchableFields: ['proftitle', 'search_desc'],
	});

	const searchVacancies = computed(() => {
		const { query } = useRoute();

		return searchEngine.search({
			page: parseInt(String(query.page)) || 1,
			per_page: parseInt(String(query.per_page)) || 1,
			sort: (String(query.sort) as Vacancy.SortType) || Vacancy.sortTypes.DEFAULT,
			filters: getQueryFilters(),
		});
	});

	const searchVacanciesPagination = computed(() => searchVacancies.value.pagination);

	const searchVacanciesListing = computed(() => searchVacancies.value.data.items);

	const searchVacanciesFacets = computed(() => searchVacancies.value.data.aggregations);

	return {
		setQueryFilters,

		searchVacancies,
		searchVacanciesPagination,
		searchVacanciesListing,
		searchVacanciesFacets,
	};
};

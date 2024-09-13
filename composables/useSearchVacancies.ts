import itemsjs from 'itemsjs';
import { Vacancy } from '~/models/vacancies';

export const useSearchVacancies = async () => {
	const {
		getQueryPage,
		setQueryPage,
		getQuerySort,
		setQuerySort,
		getQueryFilters,
		setQueryFilters,
	} = useQueryString();
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
				sort: 'count',
				order: 'desc',
				chosen_filters_on_top: false,
			},
			placetitle: {
				title: 'Город',
				size: 500,
				conjunction: false,
				sort: 'count',
				order: 'desc',
				chosen_filters_on_top: false,
			},
			stationname: {
				title: 'Станция метро',
				size: 500,
				conjunction: false,
				sort: 'count',
				order: 'desc',
				chosen_filters_on_top: false,
			},
			directiontitle: {
				title: 'Отрасль',
				size: 500,
				conjunction: false,
				sort: 'count',
				order: 'desc',
				chosen_filters_on_top: false,
			},
			clientname: {
				title: 'Профессия',
				size: 500,
				conjunction: false,
				sort: 'count',
				order: 'desc',
				chosen_filters_on_top: false,
			},
		},
	});

	const searchVacancies = computed(() => {
		const { query } = useRoute();

		return searchEngine.search({
			page: parseInt(String(query.page)) || 1,
			per_page: parseInt(String(query.per_page)) || 12,
			sort: (String(query.sort) as Vacancy.SortType) || Vacancy.sortTypes.DEFAULT,
			filters: getQueryFilters(),
		});
	});

	const searchVacanciesPagination = computed(() => {
		if (
			searchVacancies.value.pagination.total / searchVacancies.value.pagination.per_page + 1 <
			searchVacancies.value.pagination.page
		) {
			setQueryPage();
		}

		return searchVacancies.value.pagination;
	});
	const searchVacanciesListing = computed(() => searchVacancies.value.data.items);

	const searchVacanciesFacets = computed(() => searchVacancies.value.data.aggregations);

	return {
		getQueryPage,
		setQueryPage,
		getQuerySort,
		setQuerySort,
		getQueryFilters,
		setQueryFilters,

		searchVacancies,
		searchVacanciesPagination,
		searchVacanciesListing,
		searchVacanciesFacets,
	};
};

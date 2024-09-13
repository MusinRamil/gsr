<template lang="pug">
div(class='grid gap-8 sm:grid-cols-2 xl:grid-cols-[repeat(16,_minmax(0,_1fr))]')
	div(class='flex flex-row justify-between items-center xl:col-start-5 xl:col-span-12')
		div(class='text-xl') Нашли {{ searchVacanciesPagination.total }} {{ $f.pluralize(searchVacanciesPagination.total, ['предложение', 'предложения', 'предложений']) }} для тебя
		UiSort(
			v-model='sortModel',
			:sortOptions='sortOptions',
			staticClass='w-60',
			placeholder='Сортировать'
		)
	div(class='xl:col-span-4')
		VacanciesFacets(:facets='searchVacanciesFacets')
	div(class='xl:col-span-12')
		VacanciesListing(:listing='searchVacanciesListing')
		UiPagination(
			v-model='paginationModel',
			:perPage='searchVacanciesPagination.per_page',
			:total='searchVacanciesPagination.total'
		)
</template>

<script lang="ts" setup>
import { Vacancy } from '~/models/vacancies';

const {
	getQuerySort,
	setQuerySort,
	getQueryPage,
	setQueryPage,
	getQueryFilters,
	setQueryFilters,
	searchVacanciesPagination,
	searchVacanciesListing,
	searchVacanciesFacets,
} = await useSearchVacancies();

/**
 * Sort options and model
 */
const mapSortOptionsLabel = (type: Vacancy.SortType) => {
	const labels = {
		[Vacancy.sortTypes.DEFAULT]: 'По умолчанию',
		[Vacancy.sortTypes.SALARY_HIGHEST]: 'По зарплате (убывание)',
		[Vacancy.sortTypes.SALARY_LOWEST]: 'По зарплате (возрастание)',
	};
	return labels[type] || labels[Vacancy.sortTypes.DEFAULT];
};

const sortOptions = computed(() => {
	return Object.values(Vacancy.sortTypes).map(value => ({
		id: value,
		label: mapSortOptionsLabel(value),
	}));
});

const sortModel = computed({
	get: () => getQuerySort() || sortOptions.value[0].id,
	set: (value: string) =>
		Object.values(Vacancy.sortTypes).includes(value as Vacancy.SortType)
			? setQuerySort(value)
			: setQuerySort(sortOptions.value[0].id),
});

/**
 * Pagination
 */
const paginationModel = computed({
	get: () => getQueryPage() || 1,
	set: (value: number) => (value !== 1 ? setQueryPage(value) : setQueryPage(undefined)),
});
</script>

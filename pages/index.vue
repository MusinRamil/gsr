<template lang="pug">
div(class='grid gap-4 sm:grid-cols-2 xl:grid-cols-[repeat(16,_minmax(0,_1fr))]')
	div(class='xl:col-start-5 xl:col-span-12')
		h3 Нашли {{ searchVacanciesPagination.total }} {{ $f.pluralize(searchVacanciesPagination.total, ['предложение', 'предложения', 'предложений']) }} для тебя
	div(class='xl:col-span-4')
		div Фасеты
	div(class='xl:col-span-12')
		div листинг
</template>

<!-- <div>
		<div v-if="vacanciesPending">Загрузка...</div>
		<div v-if="vacanciesLoaded">
			<input
				v-model="vacanciesSearchQuery.search"
				placeholder="Поиск вакансий"
				@input="searchVacancies"
			/>

			<select v-model="vacanciesSearchQuery.sort" @change="searchVacancies">
				<option value="salary_highest">По зарплате (убывание)</option>
				<option value="salary_lowest">По зарплате (возрастание)</option>
			</select>

			<ul>
				<li v-for="vacancy in vacanciesSearchResults" :key="vacancy.vacancy_id">
					{{ vacancy.proftitle }} - {{ vacancy.salary_volume }}
				</li>
			</ul>

			<div>
				<button
					@click="vacanciesSearchQuery.page--"
					:disabled="vacanciesSearchQuery.page === 1"
				>
					Назад
				</button>
				<button @click="vacanciesSearchQuery.page++">Вперёд</button>
			</div>
		</div>
	</div> -->

<script lang="ts" setup>
const { searchVacanciesPagination, searchVacanciesListing, searchVacanciesFacets } =
	await useSearchVacancies();

console.log('searchVacancies', searchVacanciesPagination.value);

// await searchVacanciesInit();
// import { defineComponent } from 'vue';

// export default defineComponent({
//   setup() {
//     const { vacancies, loading, error, searchQuery, searchResults, facets, searchVacancies } = useVacancies();

//     return {
//       vacancies,
//       loading,
//       error,
//       searchQuery,
//       searchResults,
//       facets,
//       searchVacancies,
//     };
//   },
// });
</script>

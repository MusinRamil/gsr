<template lang="pug">
div(class='grid pb-8 gap-6 xl:grid-cols-[repeat(15,_minmax(0,_1fr))]')
	VacanciesListingItem(v-for='item in listing', :key='item.vacancy_id', :item='item')
</template>

<script lang="ts" setup>
import { Vacancy } from '~/models/vacancies';

const { listing } = defineProps<{
	listing: Vacancy.Model[];
}>();
</script>

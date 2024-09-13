<template lang="pug">
div(class='flex flex-col space-y-2 bg-white dark:bg-stone-800 rounded-lg p-4')
	div(class='text-lg font-bold text-gray-900 dark:text-stone-100') Фильтры
	div(class='flex flex-col space-y-2')
		div(class='pb-4')
			div(class='text-sm text-gray-500 dark:text-stone-400') Регион
			USelectMenu(
				v-model='regionNameModelValue',
				:options='facets.regionname.buckets',
				size='lg',
				class='w-full',
				name='labels',
				searchable,
				searchable-placeholder='Искать регион...',
				option-attribute='key',
				valueAttribute='key',
				labelAttribute='key',
				multiple
			)
				template(#option-empty='{ query }')
					q {{ query }}
					|
					| не найден
				template(#option='{ option }')
					div(
						class='w-full flex items-center content-between space-x-2',
						:class='{ "opacity-50": !Boolean(option.doc_count) }'
					)
						div {{ option.key }}
						UBadge(size='xs', variant='solid', color='gray', :ui='{ rounded: "rounded-full" }') {{ option.doc_count }}
				template(#label)
					div(v-if='regionNameModelValue.length')
						| {{ $f.pluralize(regionNameModelValue.length, ['Выбран', 'Выбрано', 'Выбрано']) }}
						|
						| {{ regionNameModelValue.length }}
						|
						| {{ $f.pluralize(regionNameModelValue.length, ['регион', 'региона', 'регионов']) }}
					div(v-else, class='text-stone-400 dark:text-stone-500') Выберите регион

		div(class='pb-4')
			div(class='text-sm text-gray-500 dark:text-stone-400') Город
			USelectMenu(
				v-model='cityModelValue',
				:options='facets.placetitle.buckets',
				size='lg',
				class='w-full',
				name='labels',
				searchable,
				searchable-placeholder='Искать город...',
				option-attribute='key',
				valueAttribute='key',
				labelAttribute='key',
				multiple
			)
				template(#option-empty='{ query }')
					q {{ query }}
					|
					| не найден
				template(#option='{ option }')
					div(
						class='w-full flex items-center content-between space-x-2',
						:class='{ "opacity-50": !Boolean(option.doc_count) }'
					)
						div {{ option.key }}
						UBadge(size='xs', variant='solid', color='gray', :ui='{ rounded: "rounded-full" }') {{ option.doc_count }}
				template(#label)
					div(v-if='cityModelValue.length')
						| {{ $f.pluralize(cityModelValue.length, ['Выбран', 'Выбрано', 'Выбрано']) }}
						|
						| {{ cityModelValue.length }}
						|
						| {{ $f.pluralize(cityModelValue.length, ['город', 'города', 'городов']) }}
					div(v-else, class='text-stone-400 dark:text-stone-500') Выберите город

		div(class='pb-4')
			div(class='text-sm text-gray-500 dark:text-stone-400') Станция метро
			USelectMenu(
				v-model='stationModelValue',
				:options='facets.stationname.buckets',
				size='lg',
				class='w-full',
				name='labels',
				searchable,
				searchable-placeholder='Искать станцию метро...',
				option-attribute='key',
				valueAttribute='key',
				labelAttribute='key',
				multiple
			)
				template(#option-empty='{ query }')
					q {{ query }}
					|
					| не найден
				template(#option='{ option }')
					div(
						class='w-full flex items-center content-between space-x-2',
						:class='{ "opacity-50": !Boolean(option.doc_count) }'
					)
						div {{ option.key }}
						UBadge(size='xs', variant='solid', color='gray', :ui='{ rounded: "rounded-full" }') {{ option.doc_count }}
				template(#label)
					div(v-if='stationModelValue.length')
						| {{ $f.pluralize(stationModelValue.length, ['Выбрана', 'Выбрано', 'Выбрано']) }}
						|
						| {{ stationModelValue.length }}
						|
						| {{ $f.pluralize(stationModelValue.length, ['станция метро', 'станции метро', 'станций метро']) }}
					div(v-else, class='text-stone-400 dark:text-stone-500') Выберите станцию метро

		div(class='pb-4')
			div(class='text-sm text-gray-500 dark:text-stone-400') Отрасль
			USelectMenu(
				v-model='directionModelValue',
				:options='facets.directiontitle.buckets',
				size='lg',
				class='w-full',
				name='labels',
				searchable,
				searchable-placeholder='Искать отрасль...',
				option-attribute='key',
				valueAttribute='key',
				labelAttribute='key',
				multiple
			)
				template(#option-empty='{ query }')
					q {{ query }}
					|
					| не найден
				template(#option='{ option }')
					div(
						class='w-full flex items-center content-between space-x-2',
						:class='{ "opacity-50": !Boolean(option.doc_count) }'
					)
						div {{ option.key }}
						UBadge(size='xs', variant='solid', color='gray', :ui='{ rounded: "rounded-full" }') {{ option.doc_count }}
				template(#label)
					div(v-if='directionModelValue.length')
						| {{ $f.pluralize(directionModelValue.length, ['Выбрана', 'Выбрано', 'Выбрано']) }}
						|
						| {{ directionModelValue.length }}
						|
						| {{ $f.pluralize(directionModelValue.length, ['отрасль', 'отрасли', 'отрослей']) }}
					div(v-else, class='text-stone-400 dark:text-stone-500') Выберите отрасль

		div(class='pb-4')
			UButton(variant='outline', size='lg', class='w-full', block, @click='resetFilters') Сбросить фильтры
</template>

<script lang="ts" setup>
const { getQueryFilters, setQueryFilters } = await useQueryString();

const { facets } = defineProps<{
	facets: any;
}>();

const filtersModel = computed(() => getQueryFilters());

/**
 * Region model
 */
const regionNameModelValue = computed({
	get(): string[] {
		return (filtersModel.value.regionname as string[]) || [];
	},
	set(value) {
		setQueryFilters({ regionname: value });
	},
});

/**
 * City model
 */
const cityModelValue = computed({
	get(): string[] {
		return (filtersModel.value.placetitle as string[]) || [];
	},
	set(value) {
		setQueryFilters({ placetitle: value });
	},
});

/**
 * Station model
 */
const stationModelValue = computed({
	get(): string[] {
		return (filtersModel.value.stationname as string[]) || [];
	},
	set(value) {
		setQueryFilters({ stationname: value });
	},
});

/**
 * Direction model
 */
const directionModelValue = computed({
	get(): string[] {
		return (filtersModel.value.directiontitle as string[]) || [];
	},
	set(value) {
		setQueryFilters({ directiontitle: value });
	},
});

/**
 * Reset filters
 */
const resetFilters = () => {
	setQueryFilters({
		regionname: undefined,
		placetitle: undefined,
		stationname: undefined,
		directiontitle: undefined,
	});
};
</script>

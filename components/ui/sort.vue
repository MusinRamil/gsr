<template lang="pug">
div(class='flex items-center space-x-2')
	USelectMenu(
		v-model='modelValue',
		:options='sortOptions',
		:placeholder='placeholder',
		:class='staticClass',
		size='lg',
		valueAttribute='id',
		labelAttribute='label'
	)
</template>

<script lang="ts" setup>
const modelValue = defineModel<string | undefined>({ default: undefined });

const {
	sortOptions,
	placeholder = 'Сортировать',
	staticClass = '',
} = defineProps<{
	sortOptions: { id: string; label: string }[];
	placeholder?: string;
	staticClass?: string;
}>();
</script>

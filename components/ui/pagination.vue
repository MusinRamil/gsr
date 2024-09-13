<template lang="pug">
UPagination(v-model='modelValue', :page-count='perPage', :total='total', :max='max', size='lg')
</template>

<script lang="ts" setup>
const modelValue = defineModel<number>({ default: 1 });

const {
	perPage,
	total,
	max = 10,
} = defineProps<{
	perPage: number;
	total: number;
	max?: number;
}>();
</script>

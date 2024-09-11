<template lang="pug">
NuxtLayout(:name='layout')
	NuxtPage
</template>

<script lang="ts" setup>
const error = useError();

const errorCode = computed(() => (error.value ? error.value.statusCode : 0));

const layout = computed(() =>
	errorCode.value >= 400 ? (errorCode.value >= 500 ? 'server-error' : 'error') : 'unknown-error'
);
</script>

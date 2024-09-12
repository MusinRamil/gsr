<template lang="pug">
Header
Main
	Container
		div(class='NotFoundPage')
			h1 Server error: {{ errorCode }}
Footer
</template>

<script lang="ts" setup>
const error = useError();

const errorCode = computed(() => (error.value ? error.value.statusCode : 0));
</script>

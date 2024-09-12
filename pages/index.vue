<template lang="pug">
h1 Hello world
pre {{ vacanciesState }}
</template>

<script lang="ts" setup>
const { vacanciesState, fetchVacancies } = useVacancies();

await fetchVacancies();
</script>

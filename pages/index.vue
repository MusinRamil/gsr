<template lang="pug">
h1 Hello world
pre {{ listingState }}
</template>

<script lang="ts" setup>
const { listingState, fetchListing } = useListing();

await fetchListing();
</script>

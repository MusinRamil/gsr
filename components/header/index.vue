<template lang="pug">
header(class='px-4 pb-5 pt-7 ring-1 ring-zinc-950/5 dark:ring-white/5')
	div(class='mx-auto flex items-end justify-end px-2 sm:px-4 lg:max-w-7xl')
		UButton(
			:icon='isDark ? "i-heroicons-moon-20-solid" : "i-heroicons-sun-20-solid"',
			color='gray',
			variant='ghost',
			aria-label='Theme',
			@click='isDark = !isDark'
		)
</template>

<script lang="ts" setup>
const colorMode = useColorMode();

const isDark = computed({
	get() {
		return colorMode.value === 'dark';
	},
	set() {
		colorMode.preference = colorMode.value === 'dark' ? 'light' : 'dark';
	},
});
</script>

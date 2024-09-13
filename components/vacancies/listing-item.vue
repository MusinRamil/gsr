<template lang="pug">
div(
	class='xl:col-span-5 bg-white dark:bg-stone-800 rounded-lg shadow-xl shadow-stone-100/50 dark:shadow-stone-900 p-4'
)
	div(class='flex flex-col items-stretch space-y-2 h-full')
		span(class='text-sm text-gray-500 dark:text-stone-400') {{ item.placetitle }}
		span(class='text-xl leading-6 min-h-12 font-bold text-gray-900 dark:text-stone-100') {{ item.proftitle }}

		div(class='border-b border-solid border-gray-200 dark:border-gray-700')

		div(class='flex-shrink flex-grow flex flex-col items-start space-y-2 py-2')
			span(class='text-md text-gray-500 dark:text-stone-400') {{ item.directiontitle }}
			span(class='text-md text-gray-500 dark:text-stone-400') {{ item.clientname }}

		div(class='border-b border-solid border-gray-200 dark:border-gray-700')

		div(class='flex items-center space-x-2 pb-4')
			span(class='text-lg font-bold text-gray-900 dark:text-stone-100') {{ item.salary_volume }}
			span(class='text-sm text-gray-500 dark:text-stone-400') {{ item.salary_type_title }}
		UButton(variant='solid', size='xl', block, @click='isOpen = true') Откликнуться!

	UModal(v-model='isOpen', :ui='{ size: "xl" }', @close='isOpen = false')
		UCard(:ui='{ ring: "", divide: "divide-y divide-gray-100 dark:divide-gray-800" }')
			template(#header)
				div(class='flex items-start justify-between space-x-2')
					div(class='flex flex-col items-start justify-between')
						span(class='text-sm text-gray-500 dark:text-stone-400') {{ item.placetitle }}
						span(class='text-xl font-bold text-gray-900 dark:text-stone-100') {{ item.proftitle }}
						div(class='flex items-center justify-between space-x-2')
							div(class='text-lg font-bold text-gray-900 dark:text-stone-100') {{ item.salary_volume }}
							div(class='text-sm text-gray-500 dark:text-stone-400') {{ item.salary_type_title }}
					UButton(
						icon='i-ci:close-md',
						color='gray',
						variant='ghost',
						aria-label='Theme',
						@click='isOpen = false'
					)
			div(class='flex flex-col items-stretch space-y-2 h-full')
				div(class='flex-shrink flex-grow flex flex-col items-start space-y-2')
					span(class='text-md text-gray-500 dark:text-stone-400') {{ item.vdescription }}
					span(class='text-md text-gray-500 dark:text-stone-400') {{ item.clientname }}

				div(class='py-6 px-6 bg-stone-50 dark:bg-stone-800 rounded-xl')
					div(v-if='successSubmit')
						div(class='flex flex-col items-stretch space-y-2 h-full')
							span(class='text-xl text-center text-gray-800 dark:text-stone-400') Отклик успешно отправлен!
							UIcon(name='i-ci:download-done', size='xl', class='w-10 h-10 mx-auto text-green-500')

					UForm(v-else, :schema='schema', :state='state', class='space-y-4 w-80 mx-auto', @submit='onSubmit')
						UFormGroup(label='Фамилия', name='surename')
							UInput(v-model='state.surename', size='xl', placeholder='Фамилия')

						UFormGroup(label='Имя', name='name')
							UInput(v-model='state.name', size='xl', placeholder='Имя')

						UFormGroup(label='Отчество', name='patronymic')
							UInput(v-model='state.patronymic', size='xl', placeholder='Отчество')

						UFormGroup(label='Номер телефона', name='phone')
							UInput(
								v-model='state.phone',
								size='xl',
								placeholder='+7',
								v-maska='"+7 (###) ###-##-##"'
							)

						div(class='border-b border-solid border-gray-200 dark:border-gray-700')

						UButton(type='submit', variant='solid', size='xl', class='w-full', block) Отправить
</template>

<script lang="ts" setup>
import { object, string, type InferType } from 'yup';
import type { FormSubmitEvent } from '#ui/types';
import { Vacancy } from '~/models/vacancies';

const { item } = defineProps<{
	item: Vacancy.Model;
}>();

/**
 * Is modal open
 */
const isOpen = ref(false);

/**
 * Schema
 */
const schema = object({
	surename: string().required('Обязательно к заполнению'),
	name: string().required('Обязательно к заполнению'),
	patronymic: string().required('Обязательно к заполнению'),
	phone: string().min(18, 'Заполните телефон до конца').required('Обязательно к заполнению'),
});

type Schema = InferType<typeof schema>;

const state = ref({
	surename: undefined,
	name: undefined,
	patronymic: undefined,
	phone: undefined,
});

const successSubmit = ref(false);
const onSubmit = async (event: FormSubmitEvent<Schema>) => {
	// Do something
	successSubmit.value = true;
};
</script>

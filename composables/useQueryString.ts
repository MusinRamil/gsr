import * as qs from 'qs';
import { queryStringDecoder } from '~/utils/math';

export interface IQueryFilter {
	[key: string]: string | number | boolean | null | undefined | IQueryFilter | IQueryFilter[];
}

/**
 * Хук для работы с query string (строкой запроса) в маршрутах.
 * @returns {Object} - Набор методов для работы с query string.
 */
export const useQueryString = () => {
	const route = useRoute();
	const router = useRouter();

	/**
	 * Преобразует строку запроса в объект.
	 * @param {string} query Строка запроса.
	 * @returns {Object} Объект с параметрами запроса.
	 *
	 * @example
	 * const result = parseQuery('key1=value1&key2=value2'); // { key1: 'value1', key2: 'value2' }
	 */
	const parseQuery = (query: string) => {
		return qs.parse(query, {
			parseArrays: true,
			arrayLimit: Infinity,
			ignoreQueryPrefix: true,
			strictNullHandling: true,
			decoder: queryStringDecoder,
		});
	};

	/**
	 * Очищает объект от значений undefined.
	 * @param {Object} obj Объект для очистки.
	 * @returns {Object} Очищенный объект.
	 *
	 * @example
	 * const result = cleanStringifyObject({ key1: 'value1', key2: undefined, key3: { key4: undefined } }); // { key1: 'value1' }
	 */
	const cleanStringifyObject = (obj: Record<string, any>) => {
		const newObj: Record<string, any> = {};
		Object.keys(obj).forEach(key => {
			if (obj[key] === Object(obj[key])) {
				newObj[key] = cleanStringifyObject(obj[key]);
			}
			if (obj[key] !== undefined) {
				newObj[key] = obj[key];
			}
		});
		return newObj;
	};

	/**
	 * Преобразует объект в строку запроса.
	 * @param {Object} query Объект с параметрами запроса.
	 * @returns {string} Строка запроса.
	 *
	 * @example
	 * const result = stringifyQuery({ key1: 'value1', key2: undefined, key3: { key4: undefined } }); // 'key1=value1'
	 */
	const stringifyQuery = (query: Record<string, any>) => {
		return qs.stringify(cleanStringifyObject(query), {
			encode: false,
			strictNullHandling: true,
			arrayFormat: 'indices',
			skipNulls: true,
		});
	};

	/**
	 * Получает номер страницы из строки запроса.
	 * @returns {number} Номер страницы.
	 *
	 * @example
	 * const result = getQueryPage(); // 1
	 */
	const getQueryPage = () => (route.query?.page ? parseInt(String(route.query?.page)) : 1);

	/**
	 * Устанавливает номер страницы в строку запроса.
	 * @param {number} [value=undefined] Номер страницы.
	 *
	 * @example
	 * setQueryPage(2); // '/?page=2'
	 */
	const setQueryPage = (value: number | undefined = undefined) => {
		router.push({
			query: {
				...route.query,
				page: value,
			},
		});
	};

	/**
	 * Получает параметр сортировки из строки запроса.
	 * @returns {string} Параметр сортировки.
	 *
	 * @example
	 * const result = getQuerySort(); // 'default'
	 */
	const getQuerySort = () => (route.query?.sort ? String(route.query?.sort) : 'default');

	/**
	 * Устанавливает параметр сортировки в строку запроса.
	 * @param {string} [value=undefined] Параметр сортировки.
	 *
	 * @example
	 * setQuerySort('name'); // '/?sort=name'
	 */
	const setQuerySort = (value: string | undefined = undefined) => {
		router.push({
			query: {
				...route.query,
				sort: value,
			},
		});
	};

	/**
	 * Получает фильтры из строки запроса.
	 * @returns {Object} Объект фильтров.
	 *
	 * @example
	 * const result = getQueryFilters(); // { key1: 'value1', key2: 'value2' }
	 */
	const getQueryFilters = () =>
		parseQuery(route.query?.filters ? route.query?.filters.toString() : '');

	/**
	 * Устанавливает фильтры в строку запроса.
	 * @param {Object} value Объект с новыми фильтрами.
	 *
	 * @example
	 * setQueryFilters({ key1: 'value1', key2: 'value2' }); // '/?filters=key1=value1&key2=value2'
	 */
	const setQueryFilters = (value: any) => {
		const queryFilters = { ...getQueryFilters(), ...value };

		router.push({
			query: {
				...route.query,
				filters:
					stringifyQuery(queryFilters) !== '' ? stringifyQuery(queryFilters) : undefined,
			},
		});
	};

	return {
		parseQuery,
		stringifyQuery,
		getQueryPage,
		setQueryPage,
		getQuerySort,
		setQuerySort,
		getQueryFilters,
		setQueryFilters,
	};
};

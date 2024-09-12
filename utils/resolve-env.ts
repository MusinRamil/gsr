/**
 * Преобразует строковое значение переменной окружения в логическое значение.
 *
 * Если переменная окружения `env` равна строке `"true"` (независимо от регистра), возвращает `true`.
 * В остальных случаях возвращает `false`, либо значение по умолчанию `fallback`, если переменная не задана.
 *
 * @param {string | undefined} env Переменная окружения, которая может содержать строку `"true"` или другое значение.
 * @param {boolean} fallback Логическое значение по умолчанию, если переменная окружения не задана.
 * @returns {boolean} Возвращает `true`, если `env` равна `"true"`, иначе `fallback`.
 *
 * @example
 * const result = resolveBooleanEnv('true', false); // true
 * const result2 = resolveBooleanEnv('false', true); // false
 * const result3 = resolveBooleanEnv(undefined, true); // true
 */
export const resolveBooleanEnv = (env: string | undefined, fallback: boolean): boolean => {
	if (typeof env === 'string') {
		return Boolean(env.toLowerCase() === 'true');
	}

	return fallback;
};

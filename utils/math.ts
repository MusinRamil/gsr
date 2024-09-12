/**
 * Вычисляет значение полинома для заданного значения x.
 *
 * Полином представляет собой выражение вида:
 * P(x) = a_n * x^n + a_(n-1) * x^(n-1) + ... + a_1 * x + a_0
 * где a_n, a_(n-1), ..., a_0 — коэффициенты полинома, переданные в виде массива.
 *
 * @param {number} x Значение, для которого вычисляется полином.
 * @param {number[]} coefficients Массив коэффициентов полинома, где coefficients[0] — это коэффициент при старшей степени.
 * @returns {number} Значение полинома при данном x.
 *
 * @example
 * const result = polynomial(2, [3, 0, 1]); // 3*2^2 + 0*2^1 + 1*2^0 = 12 + 1 = 13
 */
export const polynomial = (x: number, coefficients: number[]): number => {
	let r = 0;
	for (let degree = 0; degree < coefficients.length; degree += 1) {
		r += coefficients[coefficients.length - degree - 1] * x ** degree;
	}

	return r;
};

/**
 * Ограничивает число в заданном диапазоне.
 *
 * Если число меньше минимального значения, возвращается минимальное значение.
 * Если больше максимального, возвращается максимальное значение.
 * Если число находится в пределах диапазона, возвращается оно само.
 *
 * @param {number} num Число для ограничения.
 * @param {number} min Минимальное значение диапазона.
 * @param {number} max Максимальное значение диапазона.
 * @returns {number} Ограниченное число.
 *
 * @example
 * const result = clamp(5, 1, 10); // 5
 * const result2 = clamp(-1, 0, 10); // 0
 * const result3 = clamp(15, 0, 10); // 10
 */
export const clamp = (num: number, min: number, max: number): number => {
	return Math.min(Math.max(num, min), max);
};

/**
 * Округляет число с плавающей точкой до двух знаков после запятой.
 *
 * Использует добавление небольшого значения `Number.EPSILON` для корректной работы с неточностями при округлении.
 *
 * @param {number} num Число с плавающей точкой для округления.
 * @returns {number} Округленное число до двух знаков после запятой.
 *
 * @example
 * const result = roundFLoat(2.345); // 2.35
 * const result2 = roundFLoat(2.344); // 2.34
 */
export const roundFLoat = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100;

/**
 * Вычисляет процент одного числа от другого.
 *
 * Если делитель равен 0, возвращает 0, чтобы избежать деления на ноль.
 *
 * @param {number} val Число, для которого вычисляется процент.
 * @param {number} of Число, от которого вычисляется процент.
 * @returns {number} Процент от числа, в виде числа.
 *
 * @example
 * const result = percentOf(50, 200); // 25
 * const result2 = percentOf(30, 0); // 0
 */
export const percentOf = (val: number, of: number) => {
	if (of === 0) return 0;

	return (val / of) * 100;
};

/**
 * Проверяет, находится ли число в заданном диапазоне [min, max).
 *
 * Возвращает `true`, если число больше или равно `min` и меньше `max`. В противном случае возвращает `false`.
 * Если `min` больше `max`, диапазон инвертируется.
 *
 * @param {number} x Число для проверки.
 * @param {number} min Минимальное значение диапазона.
 * @param {number} max Максимальное значение диапазона.
 * @returns {boolean} `true`, если число в диапазоне, иначе `false`.
 *
 * @example
 * const result = inRange(5, 1, 10); // true
 * const result2 = inRange(15, 1, 10); // false
 * const result3 = inRange(5, 10, 1); // true
 */
export const inRange = (x: number, min: number, max: number) =>
	x >= Math.min(min, max) && x < Math.max(min, max);

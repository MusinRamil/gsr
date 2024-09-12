import { polynomial, clamp, roundFLoat, percentOf, inRange } from './math';

describe('math', () => {
	it.each([
		[2, [1, 2], 4],
		[3, [2, 3, 4], 31],
		[0, [5, 6, 7], 7],
		[2, [0, 0, 0], 0],
		[2, [-1, 0, 1], -3],
	])('polynomial(num=%s, coefficients=%s) = %s', (num, coefficients, expectation) => {
		expect(polynomial(num, coefficients)).toEqual(expectation);
	});

	it.each([
		[0, 0, 0, 0],
		[1, 1, 1, 1],
		[5, 1, 6, 5],
	])('clamp(num=%s, min=%s, max=%s) = %s', (num, min, max, expectation) => {
		expect(clamp(num, min, max)).toEqual(expectation);
	});

	it.each([
		[0, 0],
		[1, 1],
		[0.0001, 0],
		[0.4999, 0.5],
		[0.5001, 0.5],
		[0.5499, 0.55],
		[0.545, 0.55],
		[0.5449, 0.54],
		[1.1, 1.1],
		[1.1222, 1.12],
		[1.0001, 1],
		[1.1029, 1.1],
	])('roundFLoat(%s) = %s', (num, expectation) => {
		expect(roundFLoat(num)).toEqual(expectation);
	});

	it.each([
		[0, 0, 0],
		[1, 0, 0],
		[1, 1, 100],
		[0, 1, 0],
		[0.5, 1, 50],
		[1, 2, 50],
		[3, 9, 33.33333333333333],
	])('percentOf(val=%s, of=%s) = %s', (val, of, expectation) => {
		expect(percentOf(val, of)).toEqual(expectation);
	});

	it.each([
		[2, 0, 3, true],
		[0, 0, 0, false],
		[0, -1, 0, false],
		[0, -1, 1, true],
		[0, -2, -1, false],
		[10, 9, 11, true],
	])('inRange(val=%s, min=%s, max=%s) = %s', (val, min, max, expectation) => {
		expect(inRange(val, min, max)).toEqual(expectation);
	});
});

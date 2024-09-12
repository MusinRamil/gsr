import { resolveBooleanEnv } from './resolve-env';

describe('resolveBooleanEnv', () => {
	it.each([
		['true', true, true],
		['false', false, false],
		['TRUE', false, true],
		['', false, false],
		['random', true, false],
		[undefined, false, false],
	])('resolveBooleanEnv(env=%s, fallback=%s) = %s', (env, fallback, expectation) => {
		expect(resolveBooleanEnv(env, fallback)).toEqual(expectation);
	});
});

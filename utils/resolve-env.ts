/**
 * Resolves a boolean environment variable
 * @param env The environment variable
 * @param fallback The fallback value
 * @returns The resolved value
 */
export const resolveBooleanEnv = (env: string | undefined, fallback: boolean): boolean => {
	if (typeof env === 'string') {
		return Boolean(env.toLowerCase() === 'true');
	}

	return fallback;
};

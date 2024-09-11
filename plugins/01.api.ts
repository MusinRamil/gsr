export default defineNuxtPlugin({
	setup() {
		const { isServer } = useProcess();
		const options = useRuntimeConfig();

		const api = $fetch.create({
			baseURL: isServer ? options.api.baseURL : options.public.api.baseURL,
			retry: false,

			async onRequest(ctx) {
				const { options } = ctx;

				options.headers = {
					'Content-Type': 'application/json',
					...options.headers,
				};
			},
		});

		return {
			provide: {
				api,
			},
		};
	},
});

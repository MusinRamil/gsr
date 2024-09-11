import { joinURL, withQuery } from 'ufo';

export default defineNuxtPlugin({
	setup() {
		const { isServer } = useProcess();
		const {
			api: { baseURL: serverApiBaseURL },
			public: {
				api: { baseURL: clientApiBaseURL },
			},
		} = useRuntimeConfig();
		const nuxtApp = useNuxtApp();

		const api = $fetch.create({
			baseURL: isServer ? serverApiBaseURL : clientApiBaseURL,
			retry: false,

			async onRequest(ctx) {
				console.log('onRequest', ctx);

				const { request, options } = ctx;

				options.headers = {
					...options.headers,
				};

				if (isServer) {
					let path = withQuery(joinURL(options.baseURL ?? '', request as string), {
						...(options.query && options.query),
					});

					if (options.method === 'POST' && options.body) {
						console.log('POST', options.body);
					}
				}
			},

			async onResponse(ctx) {
				console.log('onResponse', ctx);

				if (isServer) {
					const { request, options } = ctx;
					let path = request as string;

					if (options.method === 'POST' && options.body) {
						console.log('POST', options.body);
					}
				}
			},
		});

		return {
			provide: {
				api,
			},
		};
	},
});

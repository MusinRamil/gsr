export const useProcess = () => {
	const isServer = import.meta.server;
	const isClient = import.meta.client;

	return {
		isServer,
		isClient,
	};
};

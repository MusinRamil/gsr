/**
 * Определяет, находится ли код в серверной или клиентской среде.
 *
 * Использует свойства `import.meta.server` и `import.meta.client` для определения текущего окружения выполнения.
 *
 * @returns {{ isServer: boolean, isClient: boolean }} Объект с флагами `isServer` и `isClient`.
 *
 * @example
 * const { isServer, isClient } = useProcess();
 * console.log(isServer); // true на сервере, false на клиенте
 * console.log(isClient); // true на клиенте, false на сервере
 */
export const useProcess = (
	meta: Pick<ImportMeta, 'server' | 'client'> = {
		server: import.meta.server,
		client: import.meta.client,
	}
) => {
	const isServer = meta.server;
	const isClient = meta.client;

	return {
		isServer,
		isClient,
	};
};

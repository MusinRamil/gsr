describe('useProcess', () => {
	it('должен вернуть корректные значения для серверной среды', () => {
		const { isServer, isClient } = useProcess({ server: true, client: false });
		expect(isServer).toEqual(true);
		expect(isClient).toEqual(false);
	});

	it('должен вернуть корректные значения для клиентской среды', () => {
		const { isServer, isClient } = useProcess({ server: false, client: true });
		expect(isServer).toEqual(false);
		expect(isClient).toEqual(true);
	});
});

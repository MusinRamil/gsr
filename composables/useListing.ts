import { listingService } from '~/services/listing';

export const useListingStore = () => ({
	listingState: useState<unknown>('listingState', () => []),
	listingLoaded: useState<boolean>('listingLoaded', () => false),
	listingPending: useState<boolean>('listingPending', () => true),
});

export const useListing = () => {
	const { listingState, listingLoaded, listingPending } = useListingStore();

	/**
	 * Fetch listing
	 */
	const fetchListing = async () => {
		if (listingLoaded.value) return;

		listingPending.value = true;

		listingState.value = await listingService.fetch();

		listingLoaded.value = true;
		listingPending.value = false;
	};

	/**
	 * Refresh listing
	 */
	const refreshListing = async () => {
		listingLoaded.value = false;
		await fetchListing();
	};

	return {
		listingState,
		listingLoaded,
		listingPending,

		fetchListing,
		refreshListing,
	};
};

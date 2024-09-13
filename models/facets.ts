export namespace Facets {
	export type Bucket = {
		key: string;
		doc_count: number;
		selected: boolean;
	};

	export type Model = {
		[key: string]: {
			name: string;
			title: string;
			position: number;
			buckets: Bucket[];
		};
	};
}

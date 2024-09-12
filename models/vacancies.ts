export namespace Vacancy {
	export const sortTypes = {
		DEFAULT: 'default',
		SALARY_HIGHEST: 'salary_highest',
		SALARY_LOWEST: 'salary_lowest',
	} as const;

	export type SortType = (typeof sortTypes)[keyof typeof sortTypes];

	export type Model = {
		vacancy_id: number;
		vacplacement_id: number;
		profid: number;
		proftitle: string;
		placeid: number;
		placetitle: string;
		salary_volume: string;
		salary_type: number;
		directionid: number;
		directiontitle: string;
		stafftype: number;
		vdescription: string;
		address: string;
		latitude: number;
		longitude: number;
		is_active: number;
		salary_volume_ex: string;
		clientid: number;
		clientname: string;
		flghot: number;
		region_id: number;
		search_desc: string;
		search_geo: string;
		regionname: string;
		stationname: string | null;
		numentries: number | null;
		numgeoentries: number | null;
		baseindex: number;
		flgstemmer: number;
		salary_type_title: string;
		salary_hour: number;
		salary_day: number;
		salary_week: number;
		salary_month: number;
		websitevacancynum: string;
		titleweb: string | null;
	};
}

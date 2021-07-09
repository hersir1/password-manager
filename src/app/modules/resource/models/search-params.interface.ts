export interface ISearchParams {
	pageSize: number;
	pageIndex: number;
	sortValue?: string | null;
	sortColumn?: string | null;
	name?: string | null;
}
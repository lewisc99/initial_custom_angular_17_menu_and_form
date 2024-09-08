export interface FilterModel {
	sortBy: string;
	orderByAscending: boolean;
	filterBy?: FilterBy[];
	page: number;
	pageSize: number;
	searchBy: string;
	queries: { [key: string]: string };
}

export interface FilterBy {
	propertyName: string;
	filterValue: string;
}

export interface PaginationModel {
	data?: any[];
	totalSize: number;
	mensagem: string;
	mensagemException: string;
	status: boolean;
	totalPages: number;
}

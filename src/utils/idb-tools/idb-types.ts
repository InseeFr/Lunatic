export type IDBLotItem<T = unknown> = {
	id: string;
	suggestion: T;
	tokens: string[];
	tokensMap: Record<string, { count: number; fields: string[] }>;
};

export type IDBField = {
	name: string;
	rules?: string[];
	min?: number;
	max?: number;
	language?: string;
};

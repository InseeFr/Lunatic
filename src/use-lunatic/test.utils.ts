import { LunaticData } from './type';

export const dataFromObject = (o: Record<string, unknown>): LunaticData => {
	return {
		EXTERNAL: {},
		COLLECTED: Object.keys(o).reduce(
			(acc, k) => ({
				...acc,
				[k]: {
					COLLECTED: o[k],
				},
			}),
			{}
		),
		CALCULATED: {},
	};
};

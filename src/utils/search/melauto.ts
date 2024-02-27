import { melotoOrder } from '../suggester-workers/searching/meloto-order';

export function applyMelauto<T extends { id: string; label:string}>(
	query: string,
	data: T[]
): T[] {
	console.log(data);
	return melotoOrder(
		data.map((d) => ({
			id: d.id,
			suggestion: { id: d.label ?? d.id },
			tokensSearch: {},
		})),
		query.split(' '),
		true
	).map((r) => r.suggestion) as T[];
}

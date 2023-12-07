import { melotoOrder } from '../suggester-workers/searching/meloto-order';

export function applyMelauto<T extends { id: string }>(
	query: string,
	data: T[]
): T[] {
	return melotoOrder(
		data.map((d) => ({
			id: d.id,
			suggestion: { id: d.id },
			tokensSearch: {},
		})),
		query.split(' '),
		true
	).map((r) => r.suggestion) as T[];
}

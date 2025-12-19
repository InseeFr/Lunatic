/**
 * Apply Melauto sorting algorithm on the data
 *
 * 1. Sort by melauto score
 * 2. When scores are equal, sort alphabetically with numeric awareness
 *    This ensures consistent ordering for items with identical scores
 *    (e.g., "0111Z" will appear before "0115Z" when both match "011")
 *    Numeric awareness means "item2" will come before "item10" (not "item10" before "item2")
 */
export function applyMelauto<T extends { id: string; label?: string }>(
	query: string,
	data: T[]
): T[] {
	return data.sort((a, b) => {
		const sa = melautoScore(a.label ?? a.id, query);
		const sb = melautoScore(b.label ?? b.id, query);
		const diff = sb - sa;
		if (diff !== 0) return diff;

		// If scores are equals: alphanumeric sort with numeric awareness
		const ta = (a.label ?? a.id).toString();
		const tb = (b.label ?? b.id).toString();
		return ta.localeCompare(tb, undefined, {
			numeric: true,
			sensitivity: 'base',
		});
	});
}

/**
 * Normalize a string to remove accent and other unicode character
 * "Héllo (wörld)" becomes "Hello world"
 */
const normalize = (str: string): string => {
	return str
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
		.split(/[^a-z0-9]+/)
		.filter((w) => w.length > 0)
		.join(' ');
};

/**
 * Melauto scoring algorithm
 *
 * - Rank up result if the word is closer to the start of the string
 * - Rank better the first word in the query
 * - Rank up the proportion of query terms in the string
 */
export function melautoScore(str: string, query: string) {
	const cleanedStr = normalize(str);
	const queryTerms = normalize(query).split(' ');
	return queryTerms.reduce(function (score, token, i) {
		const index = cleanedStr.search(token);
		if (index < 0) {
			return score;
		}
		const how = (cleanedStr.length - index) / cleanedStr.length;
		const weight = (queryTerms.length - i) / queryTerms.length;
		return score + how * weight;
	}, 0);
}

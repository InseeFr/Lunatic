/**
 * Apply Melauto sorting algorithm on the data
 * 
 * 1. Sort by melauto score 
 * 2. When scores are equal and query contains numbers, sort alphabetically with numeric awareness
 *    This ensures consistent ordering for numeric queries
 *    (e.g., "0111Z" will appear before "0115Z" when both match "011")
 * 3. Otherwise, preserve original order when scores are equal
 */
export function applyMelauto<T extends { id: string; label?: string }>(
	query: string,
	data: T[]
): T[] {
	// Check if query contains any digits
	const hasNumbers = /\d/.test(query);

	// Map items with their original index 
	const indexed = data.map((item, index) => ({ item, index }));

	return indexed
		.sort((a, b) => {
			const sa = melautoScore(a.item.label ?? a.item.id, query);
			const sb = melautoScore(b.item.label ?? b.item.id, query);
			const diff = sb - sa;
			if (diff !== 0) return diff;

			// When scores are equal and query has numbers, use alphanumeric comparison
			if (hasNumbers) {
				const ta = (a.item.label ?? a.item.id).toString();
				const tb = (b.item.label ?? b.item.id).toString();
				return ta.localeCompare(tb, undefined, {
					numeric: true,
					sensitivity: 'base',
				});
			}

			// Otherwise, preserve original sorting logic 
			return a.index - b.index;
		})
		.map(({ item }) => item);
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

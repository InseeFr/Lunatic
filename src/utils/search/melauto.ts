/**
 * Apply Melauto sorting algorithm on the data
 */
export function applyMelauto<T extends { id: string; label?: string }>(
	query: string,
	data: T[]
): T[] {
	return data.sort(
		(a, b) =>
			melautoScore(b.label ?? a.id, query) -
			melautoScore(a.label ?? a.id, query)
	);
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
		let how = (cleanedStr.length - index) / cleanedStr.length;
		let weight = (queryTerms.length - i) / queryTerms.length;
		return score + how * weight;
	}, 0);
}

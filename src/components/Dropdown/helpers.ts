import removeAccents from 'remove-accents';

/**
 * Filters an array of options based on a search prefix.
 **/
export function filterOptions<T extends { label?: unknown; search?: string }>(
	options: T[],
	prefix?: string
): T[] {
	if (!prefix || prefix.length === 0) {
		return options;
	}
	return options
		.map((option) => ({
			option,
			score: matchScore(option.search || labelToString(option.label), prefix),
		}))
		.filter((option) => option.score >= 0.6)
		.sort((a, b) => b.score - a.score)
		.map((o) => o.option);
}

/**
 * Extract string content from the variable received
 */
export function labelToString(label: unknown): string {
	if (label && typeof label === 'object' && 'props' in label) {
		const { props } = label;
		const { expression } = props as Record<string, string>;
		return `${expression}`;
	}

	return `${label}`;
}

/**
 * Finds letters in a label that match a given prefix.
 **/
export function lettersMatching(label: string, prefix: string = ''): string[] {
	const pref = prefix.split('');
	let pos = -1;
	const clean = preparePrefix(label);
	return clean.split('').reduce((a: string[], c: string) => {
		if (pos < pref.length && pref[pos + 1] === c) {
			pos++;
			return [...a, c];
		}
		return a;
	}, []);
}

/**
 * Calculates a score for matching a label against a prefix.
 **/
function matchScore(label: string, prefix: string): number {
	const pref = prefix.split('');
	let pos = -1;
	const clean = preparePrefix(label);
	return (
		clean.split('').reduce((a, c, idx) => {
			if (pos < pref.length && pref[pos + 1] === c) {
				pos++;
				return a + 1;
			}
			return a / (idx * 0.0001 + 1);
		}, 0) / prefix.length
	);
}

/**
 * Sanitize a prefix for search
 */
export function preparePrefix(prefix: unknown): string {
	if (typeof prefix === 'string') {
		return removeAccents(prefix.toLowerCase()).replace(/[- ']/g, '');
	}
	return '';
}

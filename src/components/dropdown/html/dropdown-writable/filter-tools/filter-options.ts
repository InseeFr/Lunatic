import match from './match';
import getLabel from './get-label';

/** */
function filterOptions<T extends { label?: unknown; search?: string }>(
	options: T[],
	prefix?: string
): T[] {
	if (!prefix || prefix.length === 0) {
		return options;
	}
	return options
		.map((option) => ({
			option,
			score: match(option.search || getLabel(option.label), prefix),
		}))
		.filter((option) => option.score >= 0.6)
		.sort((a, b) => b.score - a.score)
		.map((o) => o.option);
}

export default filterOptions;

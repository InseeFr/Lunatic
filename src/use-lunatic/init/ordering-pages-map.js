import { getPageTag } from '../commons';

function ordering(a, b) {
	for (let i = 0; i < a.length; i++) {
		if (i > b.length) {
			return -1;
		}
		const ai = a[i];
		const bi = b[i];
		if (ai > bi) {
			return 1;
		}
		if (ai < bi) {
			return -1;
		}
	}

	return 1;
}

function orderingPagesMap(map) {
	const indexes = Object.values(map)
		.map(({ levels }) => levels)
		.sort(ordering);
	const first = `${indexes[0][0]}`;
	const last = `${indexes[indexes.length - 1][0]}`;
	return {
		...indexes.reduce(function (nm, pages, index) {
			const pageTag = getPageTag(pages);
			const previous = index > 0 ? getPageTag(indexes[index - 1]) : undefined;
			const next =
				index < indexes.length - 1 ? getPageTag(indexes[index + 1]) : undefined;

			return { ...nm, [pageTag]: { ...map[pageTag], next, previous } };
		}, {}),
		first,
		last,
	};
}

export default orderingPagesMap;

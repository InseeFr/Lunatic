function collapsePart(parts = []) {
	const steps = parts.join('.');
	if (steps.length > 0) {
		return steps;
	}
	return undefined;
}

function getPageTag(levels) {
	const pagesTag = collapsePart(levels);

	return pagesTag;
}

export function mergePageTagIterations(pageTag, iterations = []) {
	if (iterations.length) {
		return `${pageTag}#${collapsePart(iterations)}`;
	}

	return pageTag;
}

export default getPageTag;

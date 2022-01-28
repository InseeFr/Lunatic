function collapsePart(parts = []) {
	return parts.join('.');
}

function getPageTag(pager) {
	const { pages, iterations = [] } = pager;
	const pagesTag = collapsePart(pages);
	if (iterations.length) {
		return `${pagesTag}#${collapsePart(iterations)}`;
	}

	return pagesTag;
}

export default getPageTag;

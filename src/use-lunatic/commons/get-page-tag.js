<<<<<<< HEAD
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
=======
function getPageTag(pager) {
	const { page, subPage, iteration } = pager;
	if (subPage !== undefined && iteration !== undefined) {
		return `${page}.${subPage + 1}#${iteration + 1}`;
	}

	return `${page}`;
>>>>>>> optimisation
}

export default getPageTag;

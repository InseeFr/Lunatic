function clearPager(pager) {
	const { maxPage, lastReachedPage } = pager;
	return {
		maxPage,
		lastReachedPage,
		page: undefined,
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		shallowIteration: undefined,
		nbIterations: undefined,
		roundabout: undefined,
	};
}

export default clearPager;

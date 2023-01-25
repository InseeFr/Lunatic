function clearPager(pager) {
	const { maxPage, lastReachedPage } = pager;
	return {
		maxPage,
		lastReachedPage,
		page: '1',
		subPage: undefined,
		nbSubPages: undefined,
		iteration: undefined,
		shallowIteration: undefined,
		nbIterations: undefined,
		roundabout: undefined,
	};
}

export default clearPager;

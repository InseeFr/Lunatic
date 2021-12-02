function isOnSubPage(pager) {
	const { subPage } = pager;
	return subPage !== undefined;
}

export default isOnSubPage;

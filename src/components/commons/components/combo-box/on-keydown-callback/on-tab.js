function onTab(e, args) {
	e.stopPropagation();
	// e.preventDefault();

	return { ...args, expended: false, focused: false };
}

export default onTab;

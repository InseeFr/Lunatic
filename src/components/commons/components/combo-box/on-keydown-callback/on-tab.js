function onTab(e, args) {
	e.stopPropagation();
	return { ...args, expended: false, focused: false };
}

export default onTab;

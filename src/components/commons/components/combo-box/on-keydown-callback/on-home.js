function onHome(e, args) {
	e.preventDefault();
	e.stopPropagation();
	const { options } = args;
	if (Array.isArray(options) && options.length > 0) {
		return { index: 0, focused: true, expended: true };
	}

	return args;
}

export default onHome;

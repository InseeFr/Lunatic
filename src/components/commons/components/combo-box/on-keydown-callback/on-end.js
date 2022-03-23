function onEnd(e, args) {
	e.preventDefault();
	e.stopPropagation();

	const { options } = args;
	if (Array.isArray(options) && options.length > 0) {
		return { selectedIndex: options.length - 1, focused: true, expended: true };
	}

	return args;
}

export default onEnd;

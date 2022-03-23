function onArrowDown(e, { options, selectedIndex }) {
	e.preventDefault();
	e.stopPropagation();
	if (Array.isArray(options) && options.length > 0) {
		if (selectedIndex !== undefined) {
			return {
				index: Math.min(selectedIndex + 1, options.length - 1),
				expended: true,
				focused: true,
			};
		}
		return { index: 0, expended: true, focused: true };
	}
	return { index: undefined, expended: false, focused: true };
}

export default onArrowDown;

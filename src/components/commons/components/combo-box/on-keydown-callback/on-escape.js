function onEscape(e, args) {
	e.preventDefault();
	e.stopPropagation();
	return { ...args, expended: false, focused: true };
}

export default onEscape;

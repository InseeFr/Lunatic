function onEnter(e, args) {
	e.preventDefault();
	e.stopPropagation();
	const { expended } = args;
	return { ...args, expended: !expended, focused: true };
}

export default onEnter;

function onTab(state) {
	return { ...state, expended: false, focused: false };
}

export default onTab;

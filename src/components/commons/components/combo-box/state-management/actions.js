export const ON_CHANGE = 'combo-box/on-change';
export const onChange = (search) => ({ type: ON_CHANGE, payload: { search } });

export const ON_SELECT = 'combo-box/on-select';
export const onSelect = (selectedIndex) => ({
	type: ON_SELECT,
	payload: { selectedIndex },
});

export const ON_KEYDOWN = 'combo-box/on-keydown';
export const onKeydown = (key, nbOptions) => ({
	type: ON_KEYDOWN,
	payload: { key, nbOptions },
});

export const ON_DELETE = 'combo-box/on-delete';
export const onDelete = () => ({ type: ON_DELETE });

export const ON_FOCUS = 'combo-box/on-focus';
export const onFocus = () => ({ type: ON_FOCUS });

export const ON_BLUR = 'combo-box/on-blur';
export const onBlur = () => ({ type: ON_BLUR });

export const ON_INIT = 'combo-box/on-init';
export const onInit = ({ ...args }) => ({
	type: ON_INIT,
	payload: { ...args },
});

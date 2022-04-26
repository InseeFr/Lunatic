export const ON_INIT = 'use-lunatic/ON_INIT';
export const onInit = ({ source, initialPage }) => ({
	type: ON_INIT,
	payload: { source, initialPage },
});

export const GO_NEXT = 'use-lunatic/go-next';
export const goNext = () => ({ type: GO_NEXT });

export const GO_PREVIOUS = 'use-lunatic/go-previous';
export const goPrevious = () => ({ type: GO_PREVIOUS });

export const HANDLE_CHANGE = 'use-lunatic/handle-change';
export const handleChange = (response, value, args) => ({
	type: HANDLE_CHANGE,
	payload: { response, value, args },
});

export const GO_NEXT = 'use-pagination/go-next';
export const goNext = () => ({ type: GO_NEXT });

export const ON_INIT = 'use-pagination/on-init';
export const onInit = ({ questionnaire, bindings, initialPage }) => ({
	type: ON_INIT,
	payload: { questionnaire, bindings, initialPage },
});

export const ON_INIT = 'use-questionnaire/on-init';
export const onInit = ({ source, data }) => ({
	type: ON_INIT,
	payload: { source, data },
});

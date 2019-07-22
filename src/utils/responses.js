export const getResponseName = response => (response && response.name) || '';

export const getResponseByPreference = preferences => response => {
	if (!(response && response.valueState)) return '';
	return preferences.reduce((_, p) => {
		const res = response.valueState.find(r => r.valueType === p);
		return res && res.value !== null ? res.value : _;
	}, '');
};

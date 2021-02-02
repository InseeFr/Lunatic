export const getResponseName = (response) => (response && response.name) || '';

export const getResponseByPreference = (preferences) => (response) => {
	if (!(response && response.values)) return null;
	return preferences.reduce((acc, p) => {
		const value = response.values[p];
		return value !== null ? value : acc;
	}, null);
};

export const getResponseName = (response) => (response && response.name) || '';

export const getResponseByPreference = (preferences) => (response) => {
	if (!(response && response.values)) return null;
	return preferences.reduce((current, p) => {
		if (p in response.values) {
			return response.values[p];
		}
		return current;
	}, null);
};

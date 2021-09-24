export const getResponseName = (response) => (response && response.name) || '';

export const getResponseByPreference = (preferences) => (response) => {
	if (!(response && response.values)) return null;
	return preferences.reduce((currentValue, preference) => {
		const { values } = response;
		if (preference in values && values[preference]) {
			return values[preference];
		}
		return currentValue;
	}, null);
};

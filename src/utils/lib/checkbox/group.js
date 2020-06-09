export const responseToClean = (responses) => (preferences) => (key) => {
	if (!preferences || !key) return false;
	const values = responses.find((r) => r.response.name === key).response.values;
	if (!values) return false;
	const cutedValues = {
		...values,
		[preferences[preferences.length - 1]]: null,
	};
	return Object.values(cutedValues).filter((v) => v !== null).length === 0;
};

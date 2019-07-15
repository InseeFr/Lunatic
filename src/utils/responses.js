export const getResponseName = response => (response && response.name) || '';

export const getResponseByType = valueType => response =>
	(response && response.valueState && response.valueState[valueType]) || '';

export const getResponseName = response =>
	response && response.name ? response.name : '';

export const getSimpleResponse = variables => response =>
	variables ? variables[getResponseName(response)] : '';

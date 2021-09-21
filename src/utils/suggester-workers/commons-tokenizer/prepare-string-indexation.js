import removeAccents from 'remove-accents';

function prepare(token = '', replacement = '') {
	return typeof token === 'string'
		? removeAccents(token.toLowerCase()).replace(/[- ']/g, replacement)
		: token;
}

export default prepare;

import removeAccents from 'remove-accents';

function prepare(token = '', replacement = '') {
	if (typeof token === 'string') {
		return removeAccents(token.trim().toLowerCase()).replace(
			/[- ']/g,
			replacement
		);
	}
	return token;
}

export default prepare;

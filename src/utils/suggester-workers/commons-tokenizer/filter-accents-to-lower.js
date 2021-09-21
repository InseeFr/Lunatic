import removeAccents from 'remove-accents';

function filter(tokens = []) {
	return tokens.map(function (token) {
		return removeAccents(token.toLowerCase());
	});
}

export default filter;

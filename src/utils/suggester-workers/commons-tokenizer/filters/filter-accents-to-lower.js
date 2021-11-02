import removeAccents from 'remove-accents';

function filterAccentToLower(tokens = []) {
	return tokens.map(function (token) {
		return removeAccents(token.toLowerCase());
	});
}

export default filterAccentToLower;

import removeAccents from 'remove-accents';

function filterAccentsToLower(tokens = []) {
	return tokens.map(function (token) {
		if (typeof token === 'string') {
			return removeAccents(token).toLowerCase();
		}
		return token;
	});
}

export default filterAccentsToLower;

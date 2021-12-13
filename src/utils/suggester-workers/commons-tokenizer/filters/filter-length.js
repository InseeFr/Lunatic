function filterLength(tokens, { min = 2 }) {
	return tokens.filter(function (token) {
		return token.length >= min;
	});
}

export default filterLength;

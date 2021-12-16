function filterToLower(tokens) {
	return tokens.map(function (token) {
		if (typeof token === 'string') {
			return token.toLocaleLowerCase();
		}
		return token;
	});
}

export default filterToLower;

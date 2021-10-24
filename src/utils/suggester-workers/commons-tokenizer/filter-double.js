function filterDouble(tokens = []) {
	const map = {};
	return tokens.reduce(function (a, token) {
		if (token in map) {
			return a;
		}
		map[token] = true;
		return [...a, token];
	}, []);
}

export default filterDouble;

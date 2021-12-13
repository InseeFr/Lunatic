import tokenizer from 'string-tokenizer';

function toArray(tokens) {
	if (Array.isArray(tokens)) {
		return tokens;
	}
	return [tokens];
}

function tokenize(object, pattern = /[\w]+/) {
	if (typeof object === 'object') {
		const map = {};
		Object.entries(object).forEach(function ([key, string]) {
			if (string.length) {
				const { tokens } = tokenizer()
					.input(string)
					.tokens({ tokens: pattern })
					.resolve();
				map[key] = toArray(tokens);
			} else {
				map[key] = [];
			}
		});

		return map;
	}
	return {};
}

export default tokenize;

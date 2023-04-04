function sort(withScore, max) {
	return withScore
		.sort(function (a, b) {
			if (a.score > b.score) {
				return -1;
			}
			if (a.score < b.score) {
				return 1;
			}
			return 0;
		})
		.slice(0, max);
}

function computeScore(documents, max = 30) {
	const withScore = documents.map(function (doc) {
		const { tokensSearch } = doc;
		const score = Object.keys(tokensSearch).length;
		return { ...doc, score };
	});

	return sort(withScore, max);
}

export default computeScore;

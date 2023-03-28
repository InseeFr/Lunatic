import { melotoOrder } from './meloto-order';

function sort(withScore) {
	return withScore.sort(function (a, b) {
		if (a.score > b.score) {
			return -1;
		}
		if (a.score < b.score) {
			return 1;
		}
		return 0;
	});
}

function computeScore(documents, tokens, meloto = true) {
	const withScore = documents.map(function (doc) {
		const { tokensSearch } = doc;
		const score = Object.keys(tokensSearch).length;
		return { ...doc, score };
	});

	return melotoOrder(sort(withScore), tokens, meloto);
}

export default computeScore;

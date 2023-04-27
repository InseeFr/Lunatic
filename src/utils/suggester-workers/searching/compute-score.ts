import { melotoOrder } from './meloto-order';
import { Entities, Entity } from './meloto-order';

function sort(withScore: Array<Entity & { score: number }>) {
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

function computeScore(
	documents: Entities,
	tokens: Array<string>,
	meloto = true
) {
	const withScore = documents.map(function (doc) {
		const { tokensSearch } = doc;
		const score = Object.keys(tokensSearch).length;
		return { ...doc, score };
	});

	return melotoOrder(sort(withScore), tokens, meloto);
}

export default computeScore;

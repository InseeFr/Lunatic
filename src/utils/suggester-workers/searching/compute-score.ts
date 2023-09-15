import { melotoOrder } from './meloto-order';
import {type  Entities, type Entity } from './meloto-order';

function sort(withScore: Array<Entity & { score: number }>) {
	return withScore.sort(function (a, b) {
		return b.score - a.score;
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

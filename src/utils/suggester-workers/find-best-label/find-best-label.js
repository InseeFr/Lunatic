import distance from 'damerau-levenshtein';

function reduceFields(map, fields, similarity) {
	return fields.reduce(function (m, field) {
		if (field in m) {
			return { ...m, [field]: m[field] + similarity };
		}
		return { ...m, [field]: similarity };
	}, map);
}

function reduceTokensMap(map, entries, word) {
	return entries.reduce(function (inter, [token, { fields }]) {
		const { similarity } = distance(token, word);
		return reduceFields(inter, fields, similarity);
	}, map);
}

function findBest(map) {
	let best = -1;
	return Object.entries(map).reduce(function (curr, [field, score]) {
		if (score > best) {
			best = score;
			return field;
		}
		return curr;
	}, undefined);
}

function findBestLabel(searchTokens = [], tokensMap = {}) {
	const entries = Object.entries(tokensMap);
	const map = searchTokens.reduce(function (map, word) {
		return reduceTokensMap(map, entries, word);
	}, {});
	const best = findBest(map);
	return best;
}

export default findBestLabel;

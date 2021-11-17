import distance from 'damerau-levenshtein';

// function reduceFields(map, fields, similarity) {
// 	return fields.reduce(function (m, field) {
// 		if (field in m) {
// 			return { ...m, [field]: m[field] + similarity };
// 		}
// 		return { ...m, [field]: similarity };
// 	}, map);
// }

// function reduceTokensMap(map, entries, word) {
// 	return entries.reduce(function (inter, [token, { fields }]) {
// 		const { similarity } = distance(token, word);
// 		return reduceFields(inter, fields, similarity);
// 	}, map);
// }

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

function findNearestToken(searchToken, tokens) {
	let max = -1;
	return tokens.reduce(function (best, token) {
		const { similarity } = distance(token, searchToken);
		if (similarity > max) {
			max = similarity;
			return token;
		}
		return best;
	}, undefined);
}

function aggregateFields(map, fields) {
	return fields.reduce(function (temp, field) {
		if (field in temp) {
			return { ...temp, [field]: temp[field] + 1 };
		}
		return { ...temp, [field]: 1 };
	}, map);
}

function findBestLabel(searchTokens = [], tokensMap = {}) {
	const tokens = Object.keys(tokensMap);
	const map = searchTokens.reduce(function (yop, st) {
		const nearest = findNearestToken(st, tokens);
		const { fields } = tokensMap[nearest];
		return aggregateFields(yop, fields);
	}, {});

	const best = findBest(map);
	return best;
}

export default findBestLabel;

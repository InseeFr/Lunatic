import prepare from '../commons-tokenizer/prepare-string-indexation';

export function value(entity, tokens) {
	const { suggestion } = entity;
	const { label } = suggestion;
	const prepared = prepare(label);
	if (label && label.length) {
		return tokens.reduce(function (score, token, i) {
			const index = prepared.search(token);
			if (index >= 0) {
				let how = label.length - index;
				how /= label.length;
				let weight = tokens.length - i;
				weight /= tokens.length;
				return score + how * weight;
			}

			return score;
		}, 0);
	}
	return 0;
}

function permute(entities, i, j) {
	const tmp = entities[i];
	entities[i] = entities[j];
	entities[j] = tmp;
}

export function melotoOrder(entities, tokens, active = true) {
	if (active) {
		let isPermute = true;
		while (isPermute) {
			isPermute = false;

			for (let i = 0; i < entities.length - 1; i++) {
				const a = entities[i];
				const b = entities[i + 1];
				if (a.score === b.score) {
					const sa = value(a, tokens);
					const sb = value(b, tokens);
					if (sb > sa) {
						permute(entities, i, i + 1);
						isPermute = true;
					}
				}
			}
		}
	}

	return entities;
}

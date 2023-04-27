import prepare from '../commons-tokenizer/prepare-string-indexation';

export type Entity = Record<string, unknown> & {
	id: string | number;
	suggestion: { label: string };
	tokensSearch: {};
};
export type Entities = Array<Entity>;

export function value(entity: Entity, tokens: Array<string> = []) {
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

/**
 * Applique une fonction de score supplémentaire pour approcher au mieux
 * la classification obtenue avec l'outil Meloto, developpé par un prestataire
 * pour le compte de l'Insee.
 * Le nouveau classement favorise l'ordre d'apparation des token de recherche
 * dans la chaine label des entités indéxées. Si la recherche contient électricien,
 * la suggestion avec un label électricien sera mieux classée que celle avec chef électricien.
 * S'il y a plusieur tokens de recherche, un poid dégréssif leur est appliqué lors du tri.
 *
 * @param {*} entities
 * @param {*} tokens
 * @param {*} active
 * @returns
 */
export function melotoOrder(
	entities: Entities,
	tokens: Array<string>,
	active = true
) {
	if (active) {
		return entities.sort((a, b) => value(a, tokens) - value(b, tokens));
	}
	return entities;
}

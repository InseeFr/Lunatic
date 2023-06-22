import { ReactNode } from 'react';
import { DECLARATION_POSITIONS } from '../../declarations';
import { LunaticBaseProps } from '../../type';

type DescriptionProps = Pick<LunaticBaseProps, 'declarations' | 'description'>;
type node = ReactNode | string;

/**
 * aggrege le label des déclarations.
 * le type de l'aggrégat dépend du type effectif du noeud, string ou ReactNode.
 * pour fonctionner avec lunatic-DSFR, son type ne peut-être que string /!\
 * en terme d'ergonomie, le texte entre le label et le composant doit être consis.
 * Si plus d'information doit-être apporté à l'utilisateur, un composant ComponentSet a été introduit.
 * Ce code doit disparaitre à terme.
 *
 * @param a node
 * @param b node
 * @returns ReactNode | string
 */
function mergeBinA(a: node, b: node) {
	if (!a || !b) {
		return a;
	}
	if (typeof a === 'string' && typeof b === 'string') {
		return `${a}\n${b}` as ReactNode;
	}
	if (Array.isArray(a) && Array.isArray(b)) {
		return [...a, ...b];
	}
	if (Array.isArray(a)) {
		return [...a, b];
	}
	if (Array.isArray(b)) {
		return [a, ...b];
	}
	// ReactNode
	return a;
}

function transform(declarations: Array<{ label: ReactNode }>): node {
	if (!declarations || !declarations.length) {
		return null;
	}
	const [first, ...rest] = declarations;
	return mergeBinA(first.label, transform(rest));
}

export function getDescription({
	declarations,
	description,
}: DescriptionProps) {
	if (typeof description === 'string') {
		return description;
	}
	if (Array.isArray(declarations)) {
		/*
			Selon le type de l'expression VTL, les description sont soit un élément JSX, soit une chaine de caratère.
			Pour lunatic-DSFR, la description ne peut-être qu'une et une seule chaine de caractère (l'usage de MD dans les expression VTL est à proscrire)
			Pour compatibilité, les déclarations after sont aggrégées soit en une chaine de caractère quand c'est possible soit en un tableau.
			/!\ Quand tout le monde utilisera stromae v3 et donc lunatic dsfr, une bonne partie du code ici devra être supprimé. /!\
		 */
		return transform(
			declarations.filter(
				(declaration) => declaration.position === DECLARATION_POSITIONS.after
			)
		);
	}
	return undefined;
}

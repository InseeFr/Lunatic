import type { LunaticComponentDefinition } from './type';

/**
 * Pour le Question : les composants du fieldset n'existe pas dans pages.
 * Ils échappent donc aux controls. On les substitue ici au Question.
 * On ne peut pas les ajouter directement dans pages (en spécifiant un page), car ils s'afficheraient 2 fois : dans le fieldset et en dessus, comme
 * des composant à part entière.
 * D'autres composant pourraient un jour figurer ici.
 */
export function replaceComponentSequence(
	components: Array<LunaticComponentDefinition>
) {
	return components.reduce(function (
		acc: Array<LunaticComponentDefinition>,
		component
	) {
		const { componentType } = component;
		switch (componentType) {
			case 'Question':
				return [...acc, ...component.components];
			default:
				return [...acc, component];
		}
	}, []);
}

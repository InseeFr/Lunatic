import type { LunaticState } from '../type';
import { LunaticComponentDefinition } from '../type';

/**
 * Pour le ComponentSet : les composants du fieldset n'existe pas dans pages.
 * Ils échappent donc aux controls. On les substitue ici au ComponentSet.
 * On ne peut pas les ajouter directement dans pages (en spécifiant un page), car ils s'afficheraient 2 fois : dans le fieldset et en dessus, comme
 * des composant à part entière.
 * D'autres composant pourraient un jour figurer ici.
 * @param components
 * @returns
 */
function replaceComponentSequence(
	components: Array<LunaticComponentDefinition>
) {
	return components.reduce(function (
		acc: Array<LunaticComponentDefinition>,
		component
	) {
		const { componentType } = component;
		if (componentType === 'ComponentSet') {
			const { components } = component;
			return [...acc, ...components];
		}
		return [...acc, component];
	},
	[]);
}

/**
 * Extract the list of components to display for the current page
 */
function getFromState(
	state: Pick<LunaticState, 'pager' | 'pages' | 'isInLoop'>
): LunaticComponentDefinition[] {
	const { pager, pages, isInLoop } = state;
	const { page, subPage } = pager;
	if (page && pages && page in pages) {
		const current = pages[page];
		if (isInLoop && current.subPages) {
			const { subPages } = current;
			const stepName = subPages[subPage ?? '0'];
			if (stepName in pages) {
				const currentSubPage = pages[stepName];
				const { components } = currentSubPage;
				return filterComponentsInPage(components);
			}
		} else {
			const { components } = current;
			return filterComponentsInPage(components);
		}
	}

	return [];
}

/**
 * Filter components to show from the list
 */
function filterComponentsInPage(components: LunaticComponentDefinition[]) {
	if (!Array.isArray(components)) {
		console.warn('no components!');
		return [];
	}
	return components.filter((c) =>
		c.componentType === 'FilterDescription' ? c.filterDescription : true
	);
}

/**
 *
 * @param state compose les fonction getFromState et replaceComponent
 * TODO vérifier que d'autres composant sont éligibles (Roundabout par ex)
 * @returns
 */
function getComponentsFromState(
	state: Pick<LunaticState, 'pager' | 'pages' | 'isInLoop'>
): LunaticComponentDefinition[] {
	return replaceComponentSequence(getFromState(state));
}

export default getComponentsFromState;

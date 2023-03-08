import { LunaticComponentDefinition } from '../../type';
import { arrayFill } from '../../../utils/array';

/**
 * List the parent component types for a page
 */
export function parentComponentsTypes(
	page: number[],
	pages: Record<
		string,
		{
			components: Pick<LunaticComponentDefinition, 'componentType'>[];
		}
	>
): ('Roundabout' | 'Loop')[] {
	if (page.length === 1) {
		return [];
	}
	return arrayFill(page.length - 1, (k) => {
		const pageIndex = page.slice(0, (k + 1) * -1).join('.');
		return pages[pageIndex]?.components[0]?.componentType === 'Roundabout'
			? 'Roundabout'
			: 'Loop';
	}).reverse();
}

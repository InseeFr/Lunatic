import { isPageReached } from '../../commons/page-tag';

const isSequence = (sourceComponent) =>
	sourceComponent.components.length > 0 &&
	'hierarchy' in sourceComponent.components[0];

function getBreadcrumb(state) {
	const { pages, executeExpression, pager } = state;

	//prevent misordered pages by extracting forbidden pages
	const loopPages = Object.values(pages).reduce((acc, curr) => {
		if (curr.subPages !== undefined) return [...acc, ...curr.subPages];
		return acc;
	}, []);

	const filteredComponents = Object.entries(pages)
		.filter(
			([k, v]) =>
				//exclude in loop components
				!loopPages.includes(k) &&
				// check isSequence (v.components.length>0 && 'hierarchy' in v.components[0])
				isSequence(v) &&
				// je suis une séquence => faire une fonction externe
				(v.components[0].hierarchy.sequence.page === k ||
					// et je suis le premier composant d'une sous séquence (qui sont dégagées dans le reduce-on-init du pager)
					(v.components[0].hierarchy.subSequence !== undefined &&
						v.components[0].hierarchy.subSequence.page === k))
		)
		.map(([, v]) => v.components[0]);
	// conditionFilter && hierarchy

	const breadcrumbEntries = { sequences: [], subSequences: [] };
	for (const component of filteredComponents) {
		const { hierarchy, conditionFilter } = component;
		if ('subSequence' in hierarchy) {
			breadcrumbEntries.subSequences.push({
				...hierarchy.subSequence,
				type: 'subSequence',
				parent: hierarchy.sequence.page,
				conditionFilter,
				visible: executeExpression(conditionFilter),
				reached: isPageReached(
					hierarchy.subSequence.page,
					pager.lastReachedPage
				),
				evaluatedLabel: executeExpression(hierarchy.subSequence.label),
				// bindings pour limiter les recalculs inutiles ?
			});
		} else {
			breadcrumbEntries.sequences.push({
				...hierarchy.sequence,
				type: 'sequence',
				conditionFilter,
				reached: isPageReached(hierarchy.sequence.page, pager.lastReachedPage),
				visible: executeExpression(conditionFilter),
				evaluatedLabel: executeExpression(hierarchy.sequence.label),
			});
		}
	}

	const { sequences, subSequences } = breadcrumbEntries;
	return [...sequences, ...subSequences];
}

export function reduceBreadcrumbOnInit(state) {
	const breadcrumb = getBreadcrumb(state);
	return { ...state, breadcrumb };
}

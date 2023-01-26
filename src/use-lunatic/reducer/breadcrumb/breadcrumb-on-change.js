import { isPageReached } from '../../commons/page-tag';

export const breadcrumbOnChange = (state) => {
	const {
		breadcrumb,
		pager: { page, lastReachedPage },
		executeExpression,
	} = state;

	const updatedBreadcrumb = breadcrumb.map((breadcrumbEntry) => {
		// page avant la page courante : pas de changement de state possible
		if (parseInt(breadcrumbEntry.page, 10) < parseInt(page, 10)) {
			if (breadcrumbEntry.reached === false) {
				return {
					...breadcrumbEntry,
					reached: isPageReached(breadcrumbEntry.page, lastReachedPage),
				};
			}
			return breadcrumbEntry;
		}
		console.log(breadcrumbEntry.page, lastReachedPage);
		return {
			...breadcrumbEntry,
			reached: isPageReached(breadcrumbEntry.page, lastReachedPage),
			visible: executeExpression(breadcrumbEntry.conditionFilter, {
				bindingDependencies:
					breadcrumbEntry.conditionFilter.bindingDependencies,
			}),
			evaluatedLabel: executeExpression(breadcrumbEntry.label),
		};
	});
	console.log({ updatedBreadcrumb });
	return { ...state, breadcrumb: updatedBreadcrumb };
};

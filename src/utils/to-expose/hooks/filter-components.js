import { interpret } from '../interpret';
import { isDev } from '../../lib';

const customFilterPagination = ({ page }, pagination, currentPage) => {
	return pagination ? currentPage.split('.')[0] === page : true;
};

const filterComponents = ({
	components,
	management,
	bindings,
	features,
	page,
	pagination,
}) => {
	const cache = {};

	if (isDev) {
		console.log('Start filter');
		var start = new Date().getTime();
	}

	if (management && !pagination) return components;

	if (management && pagination)
		return components.filter((c) =>
			customFilterPagination(c, pagination, page)
		);

	if (!pagination) {
		const filtered = components.filter(({ conditionFilter }) => {
			if (!conditionFilter || !conditionFilter.value) return true;
			const { value } = conditionFilter;
			if (cache[value] !== undefined) return cache[value];
			const inter = interpret(features)(bindings)(value);
			cache[value] = inter;
			return inter;
		});
		if (isDev) console.log(`End filter: ${new Date().getTime() - start} ms`);
		return filtered;
	}

	const pageComponents = components.filter((c) =>
		customFilterPagination(c, pagination, page)
	);

	const pageComponentsFiltered = pageComponents.filter(
		({ conditionFilter }) => {
			if (!conditionFilter || !conditionFilter.value) return true;
			const { value } = conditionFilter;
			if (cache[value] !== undefined) return cache[value];
			const inter = interpret(features)(bindings)(value);
			cache[value] = inter;
			return inter;
		}
	);
	if (isDev) console.log(`End filter: ${new Date().getTime() - start}`);
	return pageComponentsFiltered;
};

let oldComponents = [];

export const useFilterComponents = ({
	questionnaire,
	management,
	bindings,
	features,
	page,
	pagination,
	todo,
}) => {
	if (Object.keys(todo).length > 0) return oldComponents;
	const components = filterComponents({
		components: questionnaire.components,
		management,
		bindings,
		features,
		page,
		pagination,
	});
	oldComponents = components;
	return components;
};

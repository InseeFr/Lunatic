import { interpret } from '../interpret';
import { isDev } from '../../lib';

let cache = {};

const customFilterPagination = ({ page }, pagination, currentPage) => {
	return pagination ? currentPage.split('.')[0] === page : true;
};

const filterComponents = ({ components, updatedVars, features, bindings }) => {
	const localCache = {};
	const filtered = components.filter(({ conditionFilter }) => {
		if (!conditionFilter || !conditionFilter.value) return true;
		const { bindingDependencies, value } = conditionFilter;
		if (localCache[value] !== undefined) return localCache[value];
		if (
			(!bindingDependencies ||
				!updatedVars.some((t) => bindingDependencies.includes(t))) &&
			cache[value] !== undefined
		)
			return cache[value];
		const inter = interpret(features)(bindings)(value);
		localCache[value] = inter;
		return inter;
	});
	cache = { ...cache, ...localCache };
	return filtered;
};

const buildComponents = ({
	components,
	management,
	bindings,
	features,
	page,
	pagination,
	todo,
}) => {
	console.log(cache);
	if (isDev) {
		console.log('Start filter');
		var start = new Date().getTime();
	}

	if (management && !pagination) return components;

	if (management && pagination)
		return components.filter((c) =>
			customFilterPagination(c, pagination, page)
		);

	const updatedVars = Object.keys(todo);

	if (!pagination) {
		const filtered = filterComponents({
			components,
			updatedVars,
			features,
			bindings,
		});
		if (isDev) console.log(`End filter: ${new Date().getTime() - start} ms`);
		return filtered;
	}

	const pageComponents = components.filter((c) =>
		customFilterPagination(c, pagination, page)
	);

	const pageComponentsFiltered = filterComponents({
		components: pageComponents,
		updatedVars,
		features,
		bindings,
	});
	if (isDev) console.log(`End filter: ${new Date().getTime() - start}`);
	return pageComponentsFiltered;
};

let oldComponents = [];
let memoryTodo = {};

export const useFilterComponents = ({
	questionnaire,
	management,
	bindings,
	features,
	page,
	pagination,
	todo,
}) => {
	if (Object.keys(todo).length > 0) {
		memoryTodo = todo;
		return oldComponents;
	}
	const components = buildComponents({
		components: questionnaire.components,
		management,
		bindings,
		features,
		page,
		pagination,
		todo: memoryTodo,
	});
	oldComponents = components;
	return components;
};

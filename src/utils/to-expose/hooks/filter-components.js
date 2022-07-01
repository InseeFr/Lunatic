import { interpret } from '../interpret';
import { isDev, buildVectorialBindings } from '../../lib';

const customFilterPagination = ({ page }, pagination, currentPage) => {
	return pagination ? currentPage?.split('.')[0] === page : true;
};

const filterComponents = ({
	components,
	updatedVars,
	features,
	bindings,
	cache,
	setCache,
}) => {
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
		const vectorialBindings = buildVectorialBindings(bindings);
		const inter = interpret(features)(vectorialBindings)(value);
		localCache[value] = inter;
		return inter;
	});
	if (
		Object.keys(localCache).some((value) => cache[value] !== localCache[value])
	) {
		setCache((prevCache) => ({ ...prevCache, ...localCache }));
	}
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
	cache,
	setCache,
}) => {
	if (management && !pagination) return components;

	if (management && pagination)
		return components.filter((c) =>
			customFilterPagination(c, pagination, page)
		);

	if (isDev) {
		console.log('Start filter');
		var start = new Date().getTime();
	}

	const updatedVars = Object.keys(todo);

	if (!pagination) {
		const filtered = filterComponents({
			components,
			updatedVars,
			features,
			bindings,
			cache,
			setCache,
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
		cache,
		setCache,
	});
	if (isDev) console.log(`End filter: ${new Date().getTime() - start}`);
	return pageComponentsFiltered;
};

export const useFilterComponents = ({
	questionnaire,
	management,
	bindings,
	features,
	page,
	pagination,
	todo,
	cache,
	setCache,
	memoryTodo,
}) => {
	if (Object.keys(todo).length > 0) {
		return { todo };
	}
	const components = buildComponents({
		components: questionnaire.components,
		management,
		bindings,
		features,
		page,
		pagination,
		todo: memoryTodo,
		cache,
		setCache,
	});
	return { components };
};

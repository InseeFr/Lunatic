import { useEffect, useState } from 'react';
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
			if (!conditionFilter) return true;
			if (cache[conditionFilter] !== undefined) return cache[conditionFilter];
			const inter = interpret(features)(bindings)(conditionFilter);
			cache[conditionFilter] = inter;
			return inter;
		});
		if (isDev) console.log(`End filter: ${new Date().getTime() - start}`);
		return filtered;
	}

	const pageComponents = components.filter((c) =>
		customFilterPagination(c, pagination, page)
	);

	const pageComponentsFiltered = pageComponents.filter(
		({ conditionFilter }) => {
			if (!conditionFilter) return true;
			if (cache[conditionFilter] !== undefined) return cache[conditionFilter];
			const inter = interpret(features)(bindings)(conditionFilter);
			cache[conditionFilter] = inter;
			return inter;
		}
	);
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
}) => {
	const [components, setComponents] = useState([]);

	useEffect(() => {
		const c = filterComponents({
			components: questionnaire.components,
			management,
			bindings,
			features,
			page,
			pagination,
		});
		setComponents(c);
		// Assume we only want to filter after questionnaire update
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [questionnaire]);

	return { components };
};

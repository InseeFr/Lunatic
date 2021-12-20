const VTL_ATTRIBUTES = [
	'label',
	'lines.min',
	'lines.max',
	'iterations',
	'hierarchy.label',
	'hierarchy.subSequence.label',
	'hierarchy.sequence.label',
	'declarations.label',
	'controls.control',
	'controls.errorMessage',
	'conditionFilter.value',
	'options.label',
];

function crawl(path, object) {
	const [step, ...rest] = path;

	if (step in object && rest.length === 0) {
		const candidate = object[step];
		if (typeof candidate === 'string') {
			const { bindingDependencies, loopDependencies } = object;
			return {
				[candidate]: {
					bindingDependencies,
					loopDependencies,
				},
			};
		}
	} else if (step in object) {
		const next = object[step];
		if (Array.isArray(next)) {
			return next.reduce(function (stack, entry) {
				return { ...stack, ...crawl(rest, entry) };
			}, {});
		}
		return crawl(rest, next);
	}

	return {};
}

function extractFromComponent(component) {
	const { components = [] } = component;
	const nested = createExpressionsMap(components);
	const expressions = VTL_ATTRIBUTES.reduce(function (stack, attribute) {
		return { ...stack, ...crawl(attribute.split('.'), component) };
	}, {});
	return { ...expressions, ...nested };
}

function createExpressionsMap(components) {
	return components.reduce(function (exp, component) {
		return { ...exp, ...extractFromComponent(component, exp) };
	}, {});
}

export default createExpressionsMap;

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
			return { ...object, [step]: `to execute : ${candidate}` };
		}
	} else if (step in object) {
		const next = object[step];
		if (Array.isArray(next)) {
			return next.reduce(
				function (stack, entry) {
					return { ...stack, [step]: [...stack[step], crawl(rest, entry)] }; // ...crawl(rest, entry)
				},
				{ ...object, [step]: [] }
			);
		}
		return { ...object, [step]: crawl(rest, next) };
	}

	return object;
}

function fillAttributes(component, { executeExpression, iteration }) {
	return VTL_ATTRIBUTES.reduce(
		function (step, attribute) {
			return { ...step, ...crawl(attribute.split('.'), step) };
		},
		{ ...component }
	);
}

function fillComponentValue(component, { executeExpression, iteration }) {
	return fillAttributes(component, { executeExpression, iteration });
}

export default fillComponentValue;

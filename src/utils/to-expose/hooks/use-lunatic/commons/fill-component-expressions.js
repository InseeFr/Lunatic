const VTL_ATTRIBUTES = [
	'label',
	'hierarchy.label',
	'hierarchy.subSequence.label',
	'hierarchy.sequence.label',
	'declarations.label',
	'controls.control',
	'controls.errorMessage',
	'options.label',
];

function getBindingDependencies(object) {
	const { bindingDependencies = [], loopDependencies = [] } = object;
	const full = [...bindingDependencies, ...loopDependencies];
	if (full.length) {
		return full;
	}
	return undefined;
}

function createCrawl({ executeExpression, iteration }) {
	return function crawl(path, object) {
		const [step, ...rest] = path;

		if (step in object && rest.length === 0) {
			const candidate = object[step];
			if (typeof candidate === 'string') {
				return {
					...object,
					[step]: executeExpression(candidate, {
						iteration,
						bindingDependencies: getBindingDependencies(object),
					}),
				};
			}
		} else if (step in object) {
			const next = object[step];
			if (Array.isArray(next)) {
				return next.reduce(
					function (stack, entry) {
						return {
							...stack,
							[step]: [...stack[step], crawl(rest, entry)],
						};
					},
					{ ...object, [step]: [] }
				);
			}
			return { ...object, [step]: crawl(rest, next) };
		}

		return object;
	};
}
function fillAttributes(component, { executeExpression, iteration }) {
	const crawl = createCrawl({ executeExpression, iteration });
	return VTL_ATTRIBUTES.reduce(
		function (step, attribute) {
			const path = attribute.split('.');
			return {
				...step,
				...crawl(path, step),
			};
		},
		{ ...component }
	);
}

function fillComponentValue(component, { executeExpression, iteration }) {
	return fillAttributes(component, { executeExpression, iteration });
}

export default fillComponentValue;

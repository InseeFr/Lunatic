const VTL_ATTRIBUTES = [
	'label',
	'hierarchy.label',
	'hierarchy.subSequence.label',
	'hierarchy.sequence.label',
	'declarations.label',
	'controls.control',
	'controls.errorMessage',
	'options.label',
	'lines.min',
	'lines.max',
	'iterations',
];

function createCrawl({ executeExpression, iteration }) {
	/**
	 *
	 * @param {*} object
	 * @param {*} path
	 * @returns
	 */
	function executeAndFillObject(object, path) {
		const candidate = object[path];

		if (typeof candidate === 'string') {
			return {
				...object,
				[path]: executeExpression(candidate, {
					iteration,
				}),
			};
		}
		return object;
	}

	/**
	 *
	 * @param {*} object
	 * @param {*} array
	 * @param {*} path
	 * @returns
	 */
	function crawlArray(object, path) {
		const [step, ...rest] = path;
		return object[step].reduce(
			function (stack, entry) {
				return {
					...stack,
					[step]: [...stack[step], crawl(rest, entry)],
				};
			},
			{ ...object, [step]: [] }
		);
	}

	/**
	 *
	 * @param {*} object
	 * @param {*} path
	 * @returns
	 */
	function crawlObject(object, path) {
		const [step, ...rest] = path;
		return { ...object, [step]: crawl(rest, object[step]) };
	}

	/**
	 *
	 * @param {*} path
	 * @param {*} object
	 * @returns
	 */
	function crawl(path, object) {
		const [step, ...rest] = path;

		if (step in object && rest.length === 0) {
			return executeAndFillObject(object, step);
		} else if (step in object) {
			if (Array.isArray(object[step])) {
				return crawlArray(object, path);
			}
			return crawlObject(object, path);
		}

		return object;
	}

	return crawl;
}

function fillAttributes(component, { executeExpression, iteration }) {
	const crawl = createCrawl({ executeExpression, iteration });
	return VTL_ATTRIBUTES.reduce(
		function (step, fullStringPath) {
			const path = fullStringPath.split('.');
			return {
				...step,
				...crawl(path, step, fullStringPath),
			};
		},
		{ ...component }
	);
}

function fillComponentExpressions(component, { executeExpression, iteration }) {
	return fillAttributes(component, { executeExpression, iteration });
}

export default fillComponentExpressions;

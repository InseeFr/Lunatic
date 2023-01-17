const VTL_ATTRIBUTES = [
	'label',
	'description',
	'responses.label',
	'responses.description',
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
	'xAxisIterations',
	'yAxisIterations',
	'body.label',
	'header.label',
	'headers.label',
	'conditionFilter',
];

function createCrawl({ executeExpression, iteration, linksIterations }) {
	/**
	 *
	 * @param {*} object
	 * @param {*} path
	 * @returns
	 */
	function executeAndFillObject(object, path) {
		const candidate = object[path];
		return {
			...object,
			[path]: executeExpression(candidate, {
				iteration,
				linksIterations,
			}),
		};
	}

	function buildCrawlEntry(entry, path) {
		return Array.isArray(entry)
			? entry.map((e) => crawl(path, e))
			: crawl(path, entry);
	}

	/**
	 *
	 * @param {*} object
	 * @param {*} path
	 * @returns
	 */
	function crawlArray(object, path) {
		const [step, ...rest] = path;
		return object[step].reduce(
			function (stack, entry) {
				const flattedEntry = buildCrawlEntry(entry, rest);
				return {
					...stack,
					[step]: [...stack[step], flattedEntry],
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

function fillAttributes(
	component,
	{ executeExpression, iteration, linksIterations }
) {
	const crawl = createCrawl({ executeExpression, iteration, linksIterations });
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

function fillComponentExpressions(component, state) {
	const { pager, executeExpression } = state;
	const { iteration, linksIterations } = pager;

	return fillAttributes(component, {
		executeExpression,
		iteration,
		linksIterations,
	});
}

export default fillComponentExpressions;

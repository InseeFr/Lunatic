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

/**
 * Le résultat des expression dépendent de la valeur des variables associées.
 * Les couples cle/valeur sont fournies dans un objet.
 * json lunatic précise pour chaque expression la liste des variables utilisées, dans un attribut "bindingDependencies".
 * Malheureusement, la position de cette liste n'est pas sytèmatiquement contigue à l'expression, quel dommage !
 * Elles sont alors à la racine du composant (pour plusieurs expressions souvent).
 * Une autre possiblité, plus simple serait de merger les sous bindings et les root bindings avant d'executer une expression.
 */
const BINDINGSDEPENDENCIES_IS_CONTIGUOUS = {
	label: true,
	'hierarchy.label': true,
	'hierarchy.subSequence.label': false,
	'hierarchy.sequence.label': false,
	'declarations.label': true,
	'controls.control': false,
	'controls.errorMessage': false,
	'options.label': true,
	'lines.min': true,
	'lines.max': true,
	iterations: true,
};

function createCrawl(component, { executeExpression, iteration }) {
	const { bindingDependencies: rootBindings = [] } = component;

	/**
	 *
	 * @param {*} object
	 * @param {*} fullStringPath
	 * @param {*} rootBindings
	 * @returns
	 */
	function getBindingDependencies(object, fullStringPath) {
		const { bindingDependencies = [], loopDependencies = [] } = object;
		if (
			fullStringPath in BINDINGSDEPENDENCIES_IS_CONTIGUOUS &&
			BINDINGSDEPENDENCIES_IS_CONTIGUOUS[fullStringPath]
		) {
			return [...bindingDependencies, ...loopDependencies];
		}
		const full = [...rootBindings, ...loopDependencies];
		if (full.length) {
			return full;
		}
		return undefined;
	}

	/**
	 *
	 * @param {*} object
	 * @param {*} path
	 * @returns
	 */
	function executeAndFillObject(object, path, fullStringPath) {
		const candidate = object[path];
		if (typeof candidate === 'string') {
			return {
				...object,
				[path]: executeExpression(candidate, {
					iteration,
					bindingDependencies: getBindingDependencies(object, fullStringPath),
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
	function crawlArray(object, path, fullStringPath) {
		const [step, ...rest] = path;
		return object[step].reduce(
			function (stack, entry) {
				return {
					...stack,
					[step]: [...stack[step], crawl(rest, entry, fullStringPath)],
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
	function crawlObject(object, path, fullStringPath) {
		const [step, ...rest] = path;
		return { ...object, [step]: crawl(rest, object[step], fullStringPath) };
	}

	/**
	 *
	 * @param {*} path
	 * @param {*} object
	 * @returns
	 */
	function crawl(path, object, fullStringPath) {
		const [step, ...rest] = path;

		if (step in object && rest.length === 0) {
			return executeAndFillObject(object, step, fullStringPath);
		} else if (step in object) {
			if (Array.isArray(object[step])) {
				return crawlArray(object, path, fullStringPath);
			}
			return crawlObject(object, path, fullStringPath);
		}

		return object;
	}

	return crawl;
}

function fillAttributes(component, { executeExpression, iteration }) {
	const crawl = createCrawl(component, { executeExpression, iteration });
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

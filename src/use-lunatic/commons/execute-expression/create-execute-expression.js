import executeExpression from './execute-expression';
import getSafetyExpression from './get-safety-expression';
import getExpressionVariables from './get-expressions-variables';
import createMemoizer from './create-memoizer';
import createRefreshCalculated from './create-refresh-calculated';
import getVtlCompatibleValue from '../../../utils/vtl';
import { VTL, VTL_MD, X_AXIS, Y_AXIS } from '../../../utils/constants';

function validateExpression(expObject) {
	if (typeof expObject === 'object') {
		const { type } = expObject;
		if (type === VTL || type === VTL_MD) {
			return expObject;
		}
	}
	if (typeof expObject === 'string') return { value: expObject, type: VTL };
	console.warn(`Non-VTL compatible expression`);
	console.warn(expObject);
	throw new Error(`Uncompatible VTL typeof element : ${typeof expObject}`);
}

function createBindings(variables) {
	return Object.entries(variables).reduce(function (
		bindings,
		[name, { value }]
	) {
		return { ...bindings, [name]: value };
	},
	{});
}

/**
 * La boite noire VTL.
 * Une fonction de plus haut niveau (higher order function) pour générer la fonction d'exécution
 * du VTL et masquer au mieux la complexité du processus.
 *  - elle maintient en propre une Map des valeurs des variables collectées et calculées
 *  - elle extrait les tokens de chaque expression et les mémorise.
 *  - elle collecte les valeurs des variables
 *  - elle met à jour les variables calculées lorsqu'une variable collectées liées à changé
 *  - elle calcule le résultat de l'expression à l'aide de la librairie trevas
 *  - elle mémoïze le résultat
 *
 *  executeExpression : permet de compiler une expression VTL.
 *  updateBinding : permet de notifier la boite noire VTL qu'une variable collectée vient de changer.
 *
 * @param {*} variables
 * @returns [executeExpression, updateBindings]
 */
function createExecuteExpression(variables, features) {
	const bindings = createBindings(variables);
	const tokensMap = new Map();
	const collectedUpdated = new Map();
	const [memoize, getMemoizedValue] = createMemoizer();
	const [refreshCalculated, setToRefreshCalculated] = createRefreshCalculated({
		variables,
		execute,
		bindings,
	});

	/**
	 * focntion interne.
	 * appeler lorsque qu'une variable collecté à changer et donc
	 * passer les variables calculées liées en lazy.
	 * @param {*} name
	 */
	function pushToLazy(name) {
		if (name in variables) {
			const { CalculatedLinked = [] } = variables[name];
			CalculatedLinked.forEach(function (variable) {
				const { name } = variable;
				setToRefreshCalculated(name, variable);
			});
		} else {
			console.warn(`${name} is not identified as varaible!`);
		}
	}

	/**
	 * fonction externe.
	 * permet de notifier la boite noire de la mise à jour d'une variable collectée.
	 * @param {*} name
	 * @param {*} value
	 */
	function updateBindings(name, value) {
		// update des bindings : for side effects on bindings.
		if (name in bindings) {
			bindings[name] = value;
			collectedUpdated.set(name, []);
		}
		pushToLazy(name);
	}

	/**
	 * fonction interne.
	 * Collecte le nom des variables d'une expression grâce aux VTL Tools.
	 * le résultat est mémoïsé.
	 * @param {*} expression
	 * @returns
	 */
	function getVariablesAndCach(expression) {
		if (tokensMap.has(expression)) {
			return tokensMap.get(expression);
		}
		const tokens = getExpressionVariables(expression, variables);
		tokensMap.set(expression, tokens);
		return tokens;
	}

	/**
	 * fonction interne.
	 * collecte les valeurs des variables utiles à une expression.
	 * @param {*} dependencies tableau des noms de variables
	 * @returns Map nom/valeur
	 */
	function collecteVariables(dependencies) {
		if (Array.isArray(dependencies)) {
			return dependencies.reduce(function (map, name) {
				if (name in variables) {
					const data = variables[name];
					const { variable, type } = data;
					if (!(name in map)) {
						if (type === 'CALCULATED') {
							const { expression } = variable;
							const subDependencies = getVariablesAndCach(expression);

							return {
								...map,
								[name]: { ...variable },
								...collecteVariables(subDependencies),
							};
						}

						return { ...map, [name]: { ...variable } };
					}
				} else {
					throw new Error(`Unknown variable ${name}`);
				}
				return map;
			}, {});
		}
		return {};
	}

	/**
	 * fonction interne.
	 * Avant d'exécuter, on résoud la valeur de la variable, selon la portée d'exécution de l'expression
	 * @param {*} name
	 * @param {*} param1
	 * @returns
	 */
	function resolveUseContext(name, { iteration, linksIterations }) {
		const value = bindings[name];

		if ([X_AXIS, Y_AXIS].includes(name) && linksIterations !== undefined) {
			pushToLazy(name);
			const [x, y] = linksIterations;
			if (Array.isArray(value) && x < value.length) {
				return value[name === X_AXIS ? x : y];
			}
			return null;
		}
		if (iteration !== undefined && Array.isArray(value)) {
			pushToLazy(name);
			if (iteration < value.length) {
				return value[iteration];
			}
			return null;
		}
		if (linksIterations !== undefined) {
			const [x, y] = linksIterations;
			if (Array.isArray(value) && x < value.length) {
				const sub = value[x];
				if (Array.isArray(sub) && y < sub.length) {
					return sub[y];
				}
			}

			return null;
		}
		return getVtlCompatibleValue(value);
	}

	function fillVariablesValues(map, { iteration, linksIterations }) {
		return Object.entries(map).reduce(function (sub, [name, _]) {
			return {
				...sub,
				[name]: resolveUseContext(name, { iteration, linksIterations }),
			};
		}, {});
	}

	/**
	 * fonction externe.
	 * permet d'exécuter du VTL dans le reste de l'application.
	 * @param {*} vtlObject {value : string, type : "VTL" | "VTL|MD"}
	 * @param {*} args {iteration : int, linkIteration: [int, int]}
	 * @returns le résultat ou l'expression en cas de plantage
	 */
	function execute(expObject, args = {}) {
		const { value: expression, type } = validateExpression(
			getSafetyExpression(expObject)
		);
		const { iteration, linksIterations, logging } = args;
		const bindingDependencies = getVariablesAndCach(expression);

		function loggingDefault(_, bindings, e) {
			if (process.env.NODE_ENV === 'development') {
				console.warn(`VTL error :  ${expression}`, { ...args }, { bindings });
				console.warn(e);
			}
		}

		const vtlBindings = refreshCalculated(
			fillVariablesValues(collecteVariables(bindingDependencies), {
				iteration,
				linksIterations,
			}),
			{ rootExpression: expression, iteration, linksIterations }
		);
		const memoized = getMemoizedValue(expression, vtlBindings);
		if (memoized === undefined) {
			const result = executeExpression(
				vtlBindings,
				expression,
				type,
				features,
				logging || loggingDefault
			);
			memoize(expression, vtlBindings, result);

			return result;
		}
		return memoized;
	}

	return [execute, updateBindings];
}

export default createExecuteExpression;

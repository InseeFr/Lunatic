import { CALCULATED, X_AXIS, Y_AXIS } from '../../../utils/constants';

function createRefreshCalculated({ variables, execute, bindings }) {
	const toRefreshVariables = new Map(); // variables calculées dépendantes d'une variable modifiée.

	// à l'init, on y colle toutes les variables de calcul
	Object.values(variables).forEach(function ({ variable }) {
		const { variableType, name } = variable;
		if (variableType === CALCULATED) {
			toRefreshVariables.set(name, variable);
		}
	});

	function getIteration({ name, iteration, linksIterations }) {
		if (name === X_AXIS) return linksIterations[0];
		if (name === Y_AXIS) return linksIterations[1];
		return iteration;
	}

	function buildValue({
		expression,
		logging,
		shapeFrom,
		name,
		iteration,
		linksIterations,
	}) {
		const value = execute(expression, {
			logging,
			iteration: shapeFrom
				? getIteration({ name, iteration, linksIterations })
				: undefined,
		});
		if (linksIterations !== undefined) return value;
		if (shapeFrom && iteration !== undefined) {
			if (bindings[name] === undefined) {
				const shapeVariable = bindings[shapeFrom];
				const initialValue = shapeVariable.map((_, i) =>
					execute(expression, {
						logging,
						iteration: i,
					})
				);
				bindings[name] = initialValue;
				return initialValue[iteration];
			}
			if (Array.isArray(bindings[name])) {
				bindings[name][iteration] = value;
				return bindings[name][iteration];
			} else {
				console.error(`Binding not array! ${bindings[name]} for ${name}`);
				bindings[name] = null;
				return null;
			}
		} else if (shapeFrom && iteration === undefined) {
			// TODO: optimize
			const baseVar = bindings[shapeFrom];
			const v = baseVar.map((_, i) =>
				execute(expression, {
					logging,
					iteration: i,
				})
			);
			bindings[name] = v;
			return v;
		}
		bindings[name] = value;
		return value;
	}

	function refreshCalculated(
		map,
		{ rootExpression, iteration, linksIterations }
	) {
		return Object.entries(map).reduce(function (sub, [name, current]) {
			const { variable, type } = variables[name];
			if (type === CALCULATED && toRefreshVariables.has(name)) {
				const { expression, shapeFrom } = variable;

				function logging(expression, bindings, e) {
					if (process.env.NODE_ENV === 'development') {
						console.warn(
							`VTL error when refreshing calculated variable ${name} :  ${expression}`,
							{ bindings }
						);
						console.warn(`root expression : ${rootExpression}`);
						console.warn(e);
					}
				}
				const value = buildValue({
					expression,
					logging,
					shapeFrom,
					name,
					iteration,
					linksIterations,
					bindings,
				});
				if (iteration !== undefined) toRefreshVariables.delete(name);
				return { ...sub, [name]: value };
			}
			return { ...sub, [name]: current };
		}, {});
	}

	function setToRefreshCalculated(name, variable) {
		toRefreshVariables.set(name, variable);
	}

	return [refreshCalculated, setToRefreshCalculated];
}

export default createRefreshCalculated;

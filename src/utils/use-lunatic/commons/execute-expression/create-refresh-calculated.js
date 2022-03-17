function createRefreshCalculated({ variables, execute, bindings }) {
	const toRefreshVariables = new Map(); // variables calculées dépendantes d'une variable modifiée.

	// à l'init, on y colle toutes les variables de calcul
	Object.values(variables).forEach(function ({ variable }) {
		const { variableType, name } = variable;
		if (variableType === 'CALCULATED') {
			toRefreshVariables.set(name, variable);
		}
	});

	function refreshCalculated(map, { rootExpression, iteration }) {
		return Object.entries(map).reduce(function (sub, [name, current]) {
			const { variable, type } = variables[name];

			if (type === 'CALCULATED' && toRefreshVariables.has(name)) {
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

				const value = execute(expression, {
					logging,
					iteration: shapeFrom ? iteration : undefined,
				});
				bindings[name] = value;
				toRefreshVariables.delete(name);

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

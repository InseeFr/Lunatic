function reduceVariablesSimple(variables, { name, value }) {
	if (name in variables) {
		const variable = variables[name];
		return {
			...variables,
			[name]: { ...variable, value },
		};
	}

	return variables;
}

export default reduceVariablesSimple;

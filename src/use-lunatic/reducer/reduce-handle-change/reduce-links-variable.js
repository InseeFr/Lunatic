function reduceLinksVariable(variables, { name, value, linksIterations }) {
	if (name in variables) {
		const variable = variables[name];
		const { value: v } = variable;
		const [x, y] = linksIterations;
		if (v[x][y] !== undefined) {
			v[x][y] = value;
			return {
				...variables,
				[name]: { ...variable, value: v },
			};
		}
		return variables;
	}
	return variables;
}

export default reduceLinksVariable;

function reduceOne(variables, { name, value, linksIterations }) {
	if (name in variables) {
		const variable = variables[name];
		const { value: v } = variable;
		const [x, y] = linksIterations;
		if (v[x][y] !== undefined) {
			const next = [...v];
			next[x] = [...v[x]];
			next[x][y] = value;

			return {
				...variables,
				[name]: { ...variable, value: next },
			};
		}
		return variables;
	}
	return variables;
}

function reduceLinksVariable(
	variables,
	{ name, value, linksIterations, symLinks }
) {
	if (symLinks) {
		const symValue = symLinks[value];
		const [x, y] = linksIterations;
		const symIteration = [y, x];

		if (symValue) {
			return reduceOne(reduceOne(variables, { name, value, linksIterations }), {
				name,
				value: symValue,
				linksIterations: symIteration,
			});
		}
	}
	return reduceOne(variables, { name, value, linksIterations });
}

export default reduceLinksVariable;

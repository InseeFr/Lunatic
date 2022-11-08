import { resizeArrayVariable } from '../commons';

function reduceOne(variables, { name, value, linksIterations, lengths }) {
	if (name in variables) {
		const variable = variables[name];
		const { value: v } = variable;
		const [x, y] = linksIterations;
		const [lx, ly] = lengths;
		const next = resizeArrayVariable([...v], lx, []);
		next[x] = resizeArrayVariable([...next[x]], ly, null);
		next[x][y] = value;
		return {
			...variables,
			[name]: { ...variable, value: next },
		};
	}
	return variables;
}

function reduceLinksVariable(
	variables,
	{ name, value, linksIterations, symLinks, lengths }
) {
	if (symLinks) {
		const symValue = symLinks[name][value];
		const [x, y] = linksIterations;
		const symIteration = [y, x];

		if (symValue) {
			return reduceOne(
				reduceOne(variables, { name, value, linksIterations, lengths }),
				{
					name,
					value: symValue,
					linksIterations: symIteration,
					lengths,
				}
			);
		}
	}
	return reduceOne(variables, { name, value, linksIterations, lengths });
}

export default reduceLinksVariable;

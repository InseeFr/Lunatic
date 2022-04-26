import { resizeArrayVariable } from '../commons';

function reduceVariablesArray(variables, { name, value, index, length }) {
	if (name in variables) {
		const variable = variables[name];
		const { value: previousValue } = variable;

		// validation de la valeur courante : si pas un tableau ou si la taille du tableau a changé
		let valueNext = resizeArrayVariable([...previousValue], length);

		// value affectation
		valueNext[index] = value;
		return {
			...variables,
			[name]: { ...variable, value: valueNext },
		};
	}

	return variables;
}

export default reduceVariablesArray;

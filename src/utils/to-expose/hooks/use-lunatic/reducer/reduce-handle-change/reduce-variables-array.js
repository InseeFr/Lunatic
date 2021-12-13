function handleChangeLoop(variables, { name, value, index, length }) {
	if (name in variables) {
		const variable = variables[name];
		const { value: previousValue } = variable;

		// validation de la valeur courante : si pas un tableau ou si la taille du tableau a changé
		let valueNext = previousValue;
		if (!Array.isArray(previousValue)) {
			// create the array
			valueNext = new Array(length).fill(null);
		} else if (previousValue.lenght !== length) {
			// renew array end keep previous values
			valueNext = new Array(length)
				.fill(null)
				.reduce(function (step, current, index) {
					if (index < previousValue.lenght) {
						return [...step, previousValue[index]];
					}
					return [...step, current];
				}, []);
		}
		// value affectation
		valueNext[index] = value;

		return {
			...variables,
			[name]: { ...variable, value: valueNext },
		};
	}

	return variables;
}

export default handleChangeLoop;

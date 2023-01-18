/**
 * certaines variables du questionnaire sont de type tableau.
 * Il faut alors vérifier qu'elles le sont véritablement.
 * Il faut aussi vérifier quelles sont de la taille adéquate.
 */
function resizeArrayVariable(
	array: unknown,
	length: number,
	defaultValue: unknown
): unknown[] {
	if (!Array.isArray(array)) {
		// create the array
		return new Array(length).fill(defaultValue);
	} else if (array.length !== length) {
		// renew array end keep previous values
		return new Array(length)
			.fill(defaultValue)
			.reduce(function (step, current, index) {
				if (index < array.length) {
					return [...step, array[index]];
				}
				return [...step, current];
			}, []);
	}
	return array;
}

export default resizeArrayVariable;

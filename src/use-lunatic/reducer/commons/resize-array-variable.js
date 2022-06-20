/**
 * certaines variables du questionnaire sont de type tableau.
 * Il faut alors vérifier qu'elles le sont véritablement.
 * Il faut aussi vérifier quelles sont de la taille adéquate.
 * @param {*} array
 * @param {*} length
 * @returns le tableau à la taille correcte.
 */
function resizeArrayVariable(array, length, defaultValue) {
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
	// do nothing
	return array;
}

export default resizeArrayVariable;

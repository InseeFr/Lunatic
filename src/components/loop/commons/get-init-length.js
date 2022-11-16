function getInitLength(value, min, max) {
	if (min > 0 && max > 0 && min === max) {
		return min;
	}
	return Object.values(value).reduce(function (length, variable) {
		if (Array.isArray(variable)) {
			return Math.max(length, variable.length);
		}
		return length;
	}, 1);
}
export default getInitLength;

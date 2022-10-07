function getInitLength(value) {
	return Object.values(value).reduce(function (length, variable) {
		if (Array.isArray(variable)) {
			return Math.max(length, variable.length);
		}
		return length;
	}, 1);
}
export default getInitLength;

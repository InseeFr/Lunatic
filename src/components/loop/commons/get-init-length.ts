function getInitLength(value: Record<string, unknown>) {
	return Object.values(value).reduce(function (
		length: number,
		variable: unknown
	) {
		if (Array.isArray(variable)) {
			return Math.max(length, variable.length);
		}
		return length;
	},
	1);
}
export default getInitLength;

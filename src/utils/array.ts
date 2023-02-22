export function extractValue(v: unknown, path: number[]) {
	if (!Array.isArray(v)) {
		return v;
	}
	for (const n of path) {
		v = v[n];
		if (!Array.isArray(v)) {
			return v;
		}
	}
	return v;
}

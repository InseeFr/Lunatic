/**
 * Convert the value into something compatible with VTL
 */
function getVtlCompatibleValue(value: unknown) {
	if (value === undefined) {
		return null;
	}
	if (Array.isArray(value)) {
		return {
			dataStructure: { result: {} },
			dataPoints: {
				result: value,
			},
		};
	}

	return value;
}

export default getVtlCompatibleValue;

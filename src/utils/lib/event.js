export const createObjectEvent = (
	idParadataObject,
	typeParadataObject,
	type,
	responseName,
	value
) => {
	return {
		idParadataObject,
		typeParadataObject,
		type,
		responseName,
		value,
	};
};

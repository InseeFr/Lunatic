/**
 * Normalize a string
 * - Remove accent (é => e, à => a)
 * - remove ligatures (æ => ae, , Æ => ae, œ => oe, Œ => oe)
 * - Lowercase
 */
export const normalizeStr = (str: string) => {
	return str
		.toLowerCase()
		.replaceAll('œ', 'oe')
		.replaceAll('æ', 'ae')
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '');
};

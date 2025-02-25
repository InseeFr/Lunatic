/**
 * Get the correct id for characters count div, used for both input and textarea.
 */
export function getCharactersCountId(id: string, maxLength?: number) {
	return maxLength ? `characters-count-${id}` : undefined;
}

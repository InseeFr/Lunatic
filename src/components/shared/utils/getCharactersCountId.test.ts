import { describe, expect, it } from 'vitest';
import { getCharactersCountId } from './getCharactersCountId';

describe('getCharacterCountId', () => {
	it('should return the correct ID when maxLength is provided', () => {
		expect(getCharactersCountId('test-id', 100)).toBe(
			'characters-count-test-id'
		);
	});

	it('should return undefined when maxLength is not provided', () => {
		expect(getCharactersCountId('test-id')).toBeUndefined();
	});
});

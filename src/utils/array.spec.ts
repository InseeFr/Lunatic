import { describe, it, expect } from 'vitest';
import { resizeArray } from './array';

describe('resizeArray', () => {
	it('should not touch array with the correct size', () => {
		const base = [1, 2];
		return expect(resizeArray(base, 2)).toBe(base);
	});
	it('should push value correctly', () => {
		return expect(resizeArray([1, 2], 4)).toEqual([1, 2, undefined, undefined]);
	});
	it('should push default value correctly', () => {
		return expect(resizeArray([1, 2], 4, 0)).toEqual([1, 2, 0, 0]);
	});
	it('should handle non array value', () => {
		return expect(resizeArray(3, 4, 0)).toEqual([0, 0, 0, 0]);
	});
	it('should handle resizing smaller array', () => {
		return expect(resizeArray([1, 2, 3, 4], 2, 0)).toEqual([1, 2]);
	});
});

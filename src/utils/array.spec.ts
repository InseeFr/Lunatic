import { describe, it, expect } from 'vitest';
import { deepSet, resizeArray } from './array';

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

describe('deepSet', () => {
	it('should append a new item', () => {
		return expect(deepSet([1, 2], 3, [2], [2])).toEqual([1, 2, 3]);
	});
	it('should append nested item item', () => {
		return expect(deepSet([1, 2], 3, [1, 2], [2, 2])).toEqual([
			1,
			[undefined, undefined, 3],
		]);
	});
});

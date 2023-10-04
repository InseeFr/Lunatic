import { describe, it, expect } from 'vitest';
import { resizeArray, setAtIndex } from './array';

describe('array', () => {
	describe('resizeArray()', () => {
		it('should append new value', () => {
			expect(resizeArray([1, 2], 3, 3)).toEqual([1, 2, 3]);
			expect(resizeArray([1, 2], 4, 3)).toEqual([1, 2, 3, 3]);
		});
		it('should remove value', () => {
			expect(resizeArray([1, 2, 3], 1)).toEqual([1]);
		});
	});
	describe('setAtIndex', () => {
		it('should work with simple index', () => {
			expect(setAtIndex([1, 2, 3], 1, 3)).toEqual([1, 3, 3]);
		});
		it('should work with non array value', () => {
			expect(setAtIndex(null, 1, 3)).toEqual([null, 3]);
			expect(setAtIndex(4, 1, 3)).toEqual([4, 3]);
		});
		it('should work with deep index', () => {
			expect(
				setAtIndex(
					[
						[1, 2, 3],
						[1, 2, 3],
						[1, 2, 3],
					],
					[1, 2],
					10
				)
			).toEqual([
				[1, 2, 3],
				[1, 2, 10],
				[1, 2, 3],
			]);
		});
		it('should work with deep and non array value', () => {
			expect(setAtIndex([null], [1, 2], 10)).toEqual([null, [null, null, 10]]);
		});
	});
});

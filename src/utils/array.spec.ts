import { describe, it, expect } from 'vitest';
import {
	firstValueItem,
	resizeArray,
	resizeDownArrayWithIndex,
	setAtIndex,
} from './array';

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
	it('firstValueItem', () => {
		expect(firstValueItem([0, 1, 2])).toBe(0);
		expect(firstValueItem([null, 1, 2])).toBe(1);
		expect(firstValueItem([null, undefined, false])).toBe(false);
	});
	describe('resizeDownArrayWithIndex()', () => {
		it('should remove an element of array', () => {
			expect(resizeDownArrayWithIndex([1, 2, 3, 4], 2)).toEqual([1, 2, 4]);
			expect(resizeDownArrayWithIndex([1, 2, 3, 4], 0)).toEqual([2, 3, 4]);
			expect(resizeDownArrayWithIndex([1, 2, 3, 4], 3)).toEqual([1, 2, 3]);
		});

		it('should not remove element (out of index)', () => {
			expect(resizeDownArrayWithIndex([1, 2, 3, 4], -1)).toEqual([1, 2, 3, 4]);
			expect(resizeDownArrayWithIndex([1, 2, 3, 4], 4)).toEqual([1, 2, 3, 4]);
		});
	});
});

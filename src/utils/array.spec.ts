import { describe, it, expect, vi } from 'vitest';
import {
	deepCompare,
	deepForEach,
	deepLengths,
	deepSet,
	depth,
	resizeArray,
} from './array';

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

describe('depth', () => {
	it('should find the depth of the variable', () => {
		expect(depth([1, 2])).toBe(1);
		expect(depth([1, [2, 3]])).toBe(2);
		expect(depth([1, [2, [1, 2]], [2, 4]])).toBe(3);
	});
});

describe('deepForEach', () => {
	it('should handle simple array', () => {
		const spy = vi.fn(() => null);
		deepForEach([1, 2, 3], spy);
		expect(spy).toHaveBeenCalledWith(1, [0]);
		expect(spy).toHaveBeenCalledWith(2, [1]);
		expect(spy).toHaveBeenCalledWith(3, [2]);
	});
	it('should handle complex array', () => {
		const spy = vi.fn(() => null);
		deepForEach(
			[
				0,
				[
					[1, 2],
					[3, 4],
				],
				[[5, 6]],
			],
			spy
		);
		expect(spy).toHaveBeenCalledWith(1, [1, 0, 0]);
		expect(spy).toHaveBeenCalledWith(2, [1, 0, 1]);
		expect(spy).toHaveBeenCalledWith(3, [1, 1, 0]);
		expect(spy).toHaveBeenCalledWith(4, [1, 1, 1]);
		expect(spy).toHaveBeenCalledWith(5, [2, 0, 0]);
		expect(spy).toHaveBeenCalledWith(6, [2, 0, 1]);
	});
});

describe('deepLength', () => {
	it('should find multiple lenghts', () => {
		expect(deepLengths([1, 2, 3], [])).toEqual([3]);
		expect(deepLengths([1, 2, 3], [])).toEqual([3]);
		expect(deepLengths([1, [1, 2, 3], [1, 2]], [2])).toEqual([3, 2]);
		expect(deepLengths([1, [1, 2, 3], [1, 2]], [1])).toEqual([3, 3]);
		expect(deepLengths([1, [1, 2, 3], [1, [1, 2, 3, 4]]], [2, 1])).toEqual([
			3, 2, 4,
		]);
		expect(deepLengths([[1], [1, 2, 3], [1, 2]], [0])).toEqual([3, 1]);
	});
});

describe('deepCompare', () => {
	it('should compare array', () => {
		expect(deepCompare([1, 1], [1, 2])).toBe(-1);
		expect(deepCompare([1, 2], [1, 1, 1])).toBe(1);
		expect(deepCompare([1, 1], [1, 1, 1])).toBe(-1);
		expect(deepCompare([1, 1, 1], [1, 1])).toBe(1);
		expect(deepCompare([1, 1], [1, 1])).toBe(0);
		expect(deepCompare([2, 1], [1, 1])).toBe(1);
	});
});

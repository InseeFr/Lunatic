import { buildNullNestedArray } from 'utils/lib';

describe('array utils', () => {
	describe('buildNullNestedArray', () => {
		it('should return default', () => {
			expect(buildNullNestedArray()).toEqual([]);
			expect(buildNullNestedArray('')).toEqual([]);
		});
		it('should return null array', () => {
			expect(buildNullNestedArray(['5'])).toEqual([null]);
			expect(
				buildNullNestedArray([
					['1.222', 3],
					['1', '2'],
				])
			).toEqual([
				[null, null],
				[null, null],
			]);
		});
	});
});

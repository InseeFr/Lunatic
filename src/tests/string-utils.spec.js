import * as A from 'utils/string-utils';

describe('string utils', () => {
	describe('buildStyleObject', () => {
		it('should return an empty object', () => {
			expect(A.buildStyleObject()).toEqual({});
			expect(A.buildStyleObject({})).toEqual({});
		});
		it('should return same object', () => {
			expect(A.buildStyleObject({ border: 'border' })).toEqual({
				border: 'border',
			});
		});
		it('should return object with camelCase keys', () => {
			expect(A.buildStyleObject({ 'border-top': '10' })).toEqual({
				borderTop: '10',
			});
		});
	});
});

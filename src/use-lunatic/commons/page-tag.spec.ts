import { describe, it, expect } from 'vitest';
import { getPagerFromPageTag, isNewReachedPage } from './page-tag';

describe('page-tag', () => {
	describe('getPagerFromPageTag', () => {
		it('should work for simple patterns', () => {
			expect(getPagerFromPageTag('1')).toEqual({ page: [1], iteration: [] });
			expect(getPagerFromPageTag('2')).toEqual({ page: [2], iteration: [] });
		});
		it('should work for deep pages', () => {
			expect(getPagerFromPageTag('1.2.3')).toEqual({
				page: [1, 2, 3],
				iteration: [],
			});
		});
		it('should work handle iterations', () => {
			expect(getPagerFromPageTag('1.2.3#2.1')).toEqual({
				page: [1, 2, 3],
				iteration: [1, 0],
			});
		});
	});

	describe('isNewReachedPage', () => {
		const basePager = {
			lastReachedPage: '2.1#1.1',
			page: [2, 1],
			iteration: [0, 0],
		};
		it("should detect if we didn't reached a new page", () => {
			expect(isNewReachedPage(basePager)).toEqual(false);
			expect(
				isNewReachedPage({
					...basePager,
					page: [1, 1],
				})
			).toEqual(false);
			expect(
				isNewReachedPage({
					...basePager,
					page: [1, 1],
					iteration: [10, 20],
				})
			).toEqual(false);
		});
		it('should return true if we reached a new page', () => {
			expect(
				isNewReachedPage({
					...basePager,
					page: [2, 2],
				})
			).toEqual(true);
		});
		it('should return true if we reached a deeper page', () => {
			expect(
				isNewReachedPage({
					...basePager,
					page: [2, 1, 1],
				})
			).toEqual(true);
		});
		it('should return true if we reached a better iteration', () => {
			expect(
				isNewReachedPage({
					...basePager,
					iteration: [1, 2],
				})
			).toEqual(true);
		});
	});
});

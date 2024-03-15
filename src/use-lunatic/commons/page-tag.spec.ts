import { describe, it, expect } from 'vitest';
import { getPagerFromPageTag } from './page-tag';

describe('page-tag', () => {
	describe('getPagerFromPageTag', () => {
		it('should handle simple page', () => {
			expect(getPagerFromPageTag('2')).toEqual({
				page: 2,
			});
		});
		it('should handle page with iteration', () => {
			expect(getPagerFromPageTag('2.1#3')).toEqual({
				page: 2,
				subPage: 0,
				iteration: 2,
			});
		});
	});
});

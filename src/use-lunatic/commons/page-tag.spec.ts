import { describe, it, expect } from 'vitest';
import { getPagerFromPageTag, pageTagComparator } from './page-tag';
import type { PageTag } from '../type';

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

	it.each([
		['4.1', '4.2', -1],
		['4.2#1', '4.2#1', 0],
		['4.2#2', '4.2#1', 1],
		['4.1#2', '4.2#1', 1],
		['4.3#1', '4.2#1', 1],
		['4', '4.2#1', -1],
	] satisfies [PageTag, PageTag, number][])(
		'pageTagComparator("%s", "%s") -> %d',
		(a, b, expected) => {
			const expectation = expect(pageTagComparator(a, b));
			if (expected === 0) {
				expectation.toBe(0);
			}
			if (expected === 1) {
				expectation.toBeGreaterThan(0);
			}
			if (expected === -1) {
				expectation.toBeLessThan(0);
			}
		}
	);
});

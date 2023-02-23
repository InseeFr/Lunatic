import { describe, expect, it } from 'vitest';
import { getNextPager, getPrevPager } from './page-navigation';
import { LunaticState } from '../../type';

describe('page-navigation', () => {
	describe('getNextPager', () => {
		const base = {
			page: [3, 2, 1],
			maxPage: [3, 3, 3],
			iteration: [0, 0],
			maxIteration: [2, 2],
		} satisfies LunaticState['pager'];

		it('should navigate inside a sequence', () => {
			expect(getNextPager(base).page).toEqual([3, 2, 2]);
		});
		it('should increment iteration at the end of a sequence', () => {
			const pager = {
				...base,
				page: [3, 2, 3],
			};
			expect(getNextPager(pager).page).toEqual([3, 2, 1]);
			expect(getNextPager(pager).iteration).toEqual([0, 1]);
		});
		it('should move up at the end of a sequence and an iteration', () => {
			const pager = {
				...base,
				iteration: [0, 2],
				page: [3, 2, 3],
			};
			expect(getNextPager(pager).page).toEqual([3, 3]);
			expect(getNextPager(pager).iteration).toEqual([0]);
		});
		it('should move up multiple time at the end of all sequences and iterations', () => {
			const pager = {
				...base,
				iteration: [2, 2],
				page: [1, 3, 3],
			};
			expect(getNextPager(pager).page).toEqual([2]);
			expect(getNextPager(pager).iteration).toEqual([]);
		});
		it('should navigate on simple page without iteration', () => {
			const pager = {
				page: [1],
				maxPage: [3],
				iteration: [],
				maxIteration: [],
			};
			expect(getNextPager(pager).page).toEqual([2]);
		});
		it('should stop at the last page', () => {
			const pager = {
				page: [3],
				maxPage: [3],
				iteration: [],
				maxIteration: [],
			};
			expect(getNextPager(pager).page).toEqual([3]);
		});
	});

	describe('getPrevPager', () => {
		const base = {
			page: [3, 2, 3],
			maxPage: [3, 3, 3],
			iteration: [0, 0],
			maxIteration: [2, 2],
		} satisfies LunaticState['pager'];

		it('should navigate inside a sequence', () => {
			expect(getPrevPager(base).page).toEqual([3, 2, 2]);
		});
		it('should decrement iteration at the start of a sequence', () => {
			const pager = {
				...base,
				iteration: [0, 2],
				page: [3, 2, 1],
			};
			expect(getPrevPager(pager).page).toEqual([3, 2, 3]);
			expect(getPrevPager(pager).iteration).toEqual([0, 1]);
		});
		it('should move up at the start of a sequence and an iteration', () => {
			const pager = {
				...base,
				page: [3, 2, 1],
			};
			expect(getPrevPager(pager).page).toEqual([3, 1]);
			expect(getPrevPager(pager).iteration).toEqual([0]);
		});
		it('should move up multiple time at the end of all sequences and iterations', () => {
			const pager = {
				...base,
				iteration: [0, 0],
				page: [3, 1, 1],
			};
			expect(getPrevPager(pager).page).toEqual([2]);
			expect(getPrevPager(pager).iteration).toEqual([]);
		});
		it('should navigate on simple page without iteration', () => {
			const pager = {
				page: [2],
				maxPage: [3],
				iteration: [],
				maxIteration: [],
			};
			expect(getPrevPager(pager).page).toEqual([1]);
		});
		it('should stop at the first page', () => {
			const pager = {
				page: [1],
				maxPage: [3],
				iteration: [],
				maxIteration: [],
			};
			expect(getPrevPager(pager).page).toEqual([1]);
		});
	});
});

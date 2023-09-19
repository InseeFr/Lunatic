import { describe, expect, it } from 'vitest';
import { getNextPager, getPrevPager } from './page-navigation';
import type { LunaticState } from '../type';

describe('page-navigation', () => {
	describe('getNextPager', () => {
		const base = {
			page: '2',
			maxPage: '3',
			subPage: 0,
			nbSubPages: 3,
			iteration: 0,
			nbIterations: 2,
		} satisfies LunaticState['pager'];

		it('should navigate inside a sequence', () => {
			expect(getNextPager(base)).toEqual({
				...base,
				subPage: 1,
			});
		});
		it('should increment iteration at the end of a sequence', () => {
			const pager = {
				...base,
				subPage: 2,
			};
			expect(getNextPager(pager).subPage).toEqual(0);
			expect(getNextPager(pager).iteration).toEqual(1);
		});
		it('should move up at the end of a sequence and an iteration', () => {
			const pager = {
				...base,
				subPage: 3,
				iteration: 1,
			};
			const reset = {
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
			};
			expect(getNextPager(pager)).toEqual({
				...pager,
				...reset,
				page: '3',
			});
			expect(getNextPager(pager, 'Roundabout')).toEqual({
				...pager,
				...reset,
				page: '2',
			});
		});
		it('should navigate on simple page without iteration', () => {
			const pager = {
				page: '1',
				maxPage: '3',
				iteration: undefined,
			};
			expect(getNextPager(pager).page).toEqual('2');
		});
		it('should stop at the last page', () => {
			const pager = {
				page: '3',
				maxPage: '3',
				iteration: undefined,
			};
			expect(getNextPager(pager).page).toEqual('3');
		});
	});

	describe('getPrevPager', () => {
		const base = {
			page: '2',
			maxPage: '3',
			subPage: 2,
			nbSubPages: 3,
			iteration: 1,
			nbIterations: 2,
		} satisfies LunaticState['pager'];

		it('should navigate inside a sequence', () => {
			expect(getPrevPager(base)).toEqual({
				...base,
				subPage: 1,
			});
		});
		it('should decrement iteration at the start of a sequence', () => {
			const pager = {
				...base,
				subPage: 0,
			};
			expect(getPrevPager(pager).subPage).toEqual(2);
			expect(getPrevPager(pager).iteration).toEqual(0);
		});
		it('should move up at the start of a sequence and an iteration', () => {
			const pager = {
				...base,
				subPage: 0,
				iteration: 0,
			};
			const reset = {
				subPage: undefined,
				nbSubPages: undefined,
				iteration: undefined,
				nbIterations: undefined,
			};
			expect(getPrevPager(pager)).toEqual({
				...pager,
				...reset,
				page: '1',
			});
			expect(getPrevPager(pager, 'Roundabout')).toEqual({
				...pager,
				...reset,
				page: '2',
			});
			expect(getPrevPager({ ...pager, iteration: 1 }, 'Roundabout')).toEqual({
				...pager,
				...reset,
				page: '2',
			});
		});
		it('should navigate on simple page without iteration', () => {
			const pager = {
				page: '2',
				maxPage: '3',
				iteration: undefined,
			};
			expect(getPrevPager(pager).page).toEqual('1');
		});
		it('should stop at the first page', () => {
			const pager = {
				page: '1',
				maxPage: '3',
				iteration: undefined,
			};
			expect(getPrevPager(pager).page).toEqual('1');
		});
	});
});

import { describe, it, expect } from 'vitest';
import { reduceOnInit } from './reduce-on-init';
import INITIAL_STATE from '../initial-state';
import source from '../../stories/loop/source-loop-loop.json';
import { generateData, generateState } from '../../../test/helpers';
import { LunaticSource } from '../type-source';
import reduceGoToPage from './reduce-go-to-page';
import { goToPage } from '../actions';

const baseData = {
	PRENOM: ['John', 'Jane'],
	AGE: [29, 32],
	PRENOM_CHILDREN: [
		['John Junior 1', 'John Junior 2'],
		['Jane Junior 1', 'Jane Junior 2', 'Jane Junior 3'],
	],
	AGE_CHILDREN: [
		[13, 10],
		[9, 8, 2],
	],
};

describe('reduceGoToPage', () => {
	it('should handle loops', () => {
		let state = generateState(source, baseData);
		expect(state.pager.page).toEqual([1]);
		expect(state.pager.iteration).toEqual([]);
		const action = goToPage({
			page: [2, 3, 2],
			iteration: [0, 0],
		});
		state = reduceGoToPage(state, action);
		expect(state.pager.page).toEqual(action.payload.page);
		expect(state.pager.iteration).toEqual(action.payload.iteration);
		expect(state.pager.maxPage).toEqual([3, 3, 2]);
		expect(state.pager.maxIteration).toEqual([1, 1]);

		state = reduceGoToPage(
			state,
			goToPage({
				page: [2, 3, 2],
				iteration: [1, 2],
			})
		);
		expect(state.pager.maxPage).toEqual([3, 3, 2]);
		expect(state.pager.maxIteration).toEqual([1, 2]);
	});

	it('should force iteration', () => {
		const state = reduceGoToPage(
			generateState(source, baseData),
			goToPage({
				page: [2, 2],
			})
		);
		expect(state.pager.page).toEqual([2, 2]);
		expect(state.pager.maxPage).toEqual([3, 3]);
		expect(state.pager.iteration).toEqual([0]);
		expect(state.pager.maxIteration).toEqual([1]);
	});

	it('should handle jumping from empty page', () => {
		const state = reduceGoToPage(
			generateState(source, baseData),
			goToPage({
				page: [2],
				iteration: [],
			})
		);
		expect(state.pager.page).toEqual([2, 1]);
		expect(state.pager.maxPage).toEqual([3, 3]);
		expect(state.pager.maxIteration).toEqual([1]);
	});

	it('should throw an error on unreachable page', () => {
		expect(() =>
			reduceGoToPage(
				generateState(source, baseData),
				goToPage({
					page: [10, 3],
					iteration: [],
				})
			)
		).toThrowError();
	});
});

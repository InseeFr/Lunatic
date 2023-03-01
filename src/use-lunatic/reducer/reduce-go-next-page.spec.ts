import { describe, expect, it } from 'vitest';
import source from '../../stories/roundabout/source.json';
import { generateState } from '../../../test/helpers';
import { goNextPage } from '../actions';
import reduceGoNextPage from './reduce-go-next-page';

const baseData = {
	NB_HAB: 2,
	SOMETHING: ['aze'],
	AGE: [15, 15],
	SEXE: ['1'],
	PRENOMS: ['Fanny', 'Ines'],
	KNOWREC: ['1', '1'],
};

describe('reduceGoNextPage', () => {
	describe('on roundabout', () => {
		it('should return to the roundabout at the end of an iteration', () => {
			const state = reduceGoNextPage(
				generateState(source, baseData, { initialPage: '4.3#1' }),
				goNextPage({})
			);
			expect(state.pager.page).toEqual([4]);
			expect(state.pager.iteration).toEqual([]);
		});
	});
});

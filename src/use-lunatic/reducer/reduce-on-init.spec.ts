import { describe, it, expect } from 'vitest';
import source from '../../stories/questionnaires/simpsons/source.json';
import { generateState } from '../../../test/helpers';

describe('reduceOnInit', () => {
	it('should handle initialPage', () => {
		expect(generateState(source).pager.page).toEqual([1]);
		expect(
			generateState(source, undefined, { initialPage: '2' }).pager.page
		).toEqual([2]);
	});
});

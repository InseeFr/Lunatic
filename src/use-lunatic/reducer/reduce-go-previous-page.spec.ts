import { describe, expect, it } from 'vitest';
import { generateState } from '../../../tests/utils/lunatic';
import sourceConfirmationModal from '../../stories/modal/source.json';
import { type LunaticSource } from '../type-source';
import reduceGoPreviousPage from './reduce-go-previous-page';

describe('reduceGoPreviousPage', () => {
	it('should skip modal when going backward', () => {
		const state = generateState(sourceConfirmationModal as LunaticSource);
		state.pager.page = '3';
		expect(reduceGoPreviousPage(state).pager.page).toBe('1');
	});
});

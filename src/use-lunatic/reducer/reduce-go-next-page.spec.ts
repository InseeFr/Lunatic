import { describe, expect, it } from 'vitest';
import { generateState } from '../../../tests/utils/lunatic';
import sourceConfirmationModal from '../../stories/modal/source.json';
import { type LunaticSource } from '../type-source';
import { reduceGoNextPage } from './reduce-go-next-page';

describe('reduceGoPreviousPage', () => {
	it('should move forward for modal', () => {
		const state = generateState(sourceConfirmationModal as LunaticSource);
		expect(reduceGoNextPage(state).pager.page).toBe('2');
	});
});

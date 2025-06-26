import { act, renderHook } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import loopControlSource from '../stories/questionnaires/bug/loopControl.json';
import surveyUnit from '../stories/questionnaires/bug/loopControlSurveyUnit.json';
import { useLunatic } from './use-lunatic';

describe('use-lunatic()', () => {
	it('should compile errors correctly', () => {
		const { result } = renderHook(() =>
			useLunatic(loopControlSource, surveyUnit.data)
		);
		act(() => {
			result.current.goToPage({ page: '3' });
		});
		const { currentErrors } = result.current.compileControls();
		expect(currentErrors).not.toBeUndefined();
		expect(Object.keys(currentErrors!).length).toEqual(6);
	});
	it('should compile errors correctly 2', () => {
		const { result } = renderHook(() =>
			useLunatic(loopControlSource, {
				COLLECTED: {
					PRES_SAL: { COLLECTED: ['1', null, '2', null, null, null] },
				},
				...surveyUnit.data,
			})
		);
		act(() => {
			result.current.goToPage({ page: '3' });
		});
		act(() => {
			const { currentErrors } = result.current.compileControls();
			//console.log(result.current.getComponents());
			expect(currentErrors).not.toBeUndefined();
			expect(Object.keys(currentErrors!).length).toEqual(4);
		});
	});
});

/*"COLLECTED": {
			"PRES_SAL": { "COLLECTED": [null, null, "2", null, null, null] }
		},*/

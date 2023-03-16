import { describe, expect, it } from 'vitest';
import { generateState } from '../../../../tests/utils/lunatic';
import source from './__mocks__/source-cleaning-loop.json';
import reduceCleaning from './reduce-cleaning';
import { ActionKind } from '../../actions';

describe.only('reduceCleaning', () => {
	it('should clean variable', () => {
		const state = generateState(source as any, {
			PRENOMREP: ['John', 'Jane'],
			VITICI: ['1', null],
			NBF: [1, 2],
		});
		const newState = reduceCleaning(state, {
			type: ActionKind.HANDLE_CHANGE,
			payload: {
				response: { name: 'PRENOMREP' },
				value: ['Jane'],
			},
		});
		expect(newState.variables['NBF'].value).toEqual([null]);
	});
	it('should clean within a loop', () => {
		const state = generateState(
			source as any,
			{
				PRENOMREP: ['John', 'Jane'],
				VITICI: ['1', null],
				NBF: [1, 2],
			},
			{
				initialPage: '2.2#2',
			}
		);
		const newState = reduceCleaning(state, {
			type: ActionKind.HANDLE_CHANGE,
			payload: {
				response: { name: 'VITICI' },
				value: '1',
			},
		});
		expect(newState.variables['NBF'].value).toEqual([1, null]);
	});
});

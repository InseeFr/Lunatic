import { describe, expect, test } from 'vitest';
import { VTL } from '../../../utils/constants';
import fillComponentExpressions from './fill-component-expressions';
import { LunaticExpression } from '../../type';
import { an } from 'vitest/dist/types-d97c72c7';

describe.only('fillComponentExpressions', () => {
	const exp = (s: string) => ({ value: s, type: 'VTL' });
	const component = {
		label: exp('label'),
		header: [{ label: exp('1') }, { label: exp('2') }],
	};

	test('it should convert expression', () => {
		const translated = fillComponentExpressions(component as any, {
			executeExpression: (expression: any) => expression.value,
			pager: {
				maxPage: '10',
				page: '10',
				iteration: 1,
				linksIterations: [1, 2],
			},
		});
		expect(translated).toEqual({
			label: 'label',
			header: [{ label: '1' }, { label: '2' }],
		});
	});
});

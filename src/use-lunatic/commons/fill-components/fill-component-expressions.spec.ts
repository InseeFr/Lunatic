import { describe, expect, test } from 'vitest';
import fillComponentExpressions from './fill-component-expressions';

describe('fillComponentExpressions', () => {
	const exp = (s: string) => ({ value: s, type: 'VTL' });
	const component = {
		label: exp('label'),
		header: [{ label: exp('1') }, { label: exp('2') }],
	};

	test('it should convert expression', () => {
		const translated = fillComponentExpressions(component as any, {
			executeExpression: (expression: any) => expression.value,
			pager: {
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

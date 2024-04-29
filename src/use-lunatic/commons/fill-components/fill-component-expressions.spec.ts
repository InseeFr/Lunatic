import { describe, expect, it } from 'vitest';
import { fillComponentExpressions } from './fill-component-expressions';

describe('fillComponentExpressions', () => {
	const exp = (s: string | number) => ({
		value: s.toString(),
		type: 'VTL' as const,
	});
	const component = {
		label: exp('label'),
		page: '1',
		id: 'a',
		componentType: 'CheckboxGroup',
		responses: [
			{
				label: exp('Response 1'),
				response: { name: 'A' },
				id: 'a',
			},
			{
				label: exp('Response 2'),
				response: { name: 'B' },
				id: 'b',
			},
		],
	} satisfies Parameters<typeof fillComponentExpressions>[0];

	const loopComponent = {
		label: exp('label'),
		page: '1',
		id: 'b',
		componentType: 'RosterForLoop',
		components: [],
		lines: { min: exp('1'), max: exp('10') },
		positioning: 'HORIZONTAL',
	} satisfies Parameters<typeof fillComponentExpressions>[0];

	const fillComponent = (
		component: Parameters<typeof fillComponentExpressions>[0]
	) => {
		return fillComponentExpressions(component, {
			executeExpression: (expression: any) => expression.value,
			pager: {
				iteration: 1,
				linksIterations: [1, 2],
			},
		});
	};

	it('convert expressions inside components', () => {
		expect(fillComponent(component)).toMatchInlineSnapshot(`
			{
			  "componentType": "CheckboxGroup",
			  "id": "a",
			  "label": "label",
			  "page": "1",
			  "responses": [
			    {
			      "id": "a",
			      "label": "Response 1",
			      "response": {
			        "name": "A",
			      },
			    },
			    {
			      "id": "b",
			      "label": "Response 2",
			      "response": {
			        "name": "B",
			      },
			    },
			  ],
			}
		`);
		expect(fillComponent(loopComponent)).toMatchInlineSnapshot(`
			{
			  "componentType": "RosterForLoop",
			  "components": [],
			  "id": "b",
			  "label": "label",
			  "lines": {
			    "max": 10,
			    "min": 1,
			  },
			  "page": "1",
			  "positioning": "HORIZONTAL",
			}
		`);
	});
});

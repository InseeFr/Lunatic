import { describe, expect, test } from 'vitest';
import getExpressionVariables from './get-expressions-variables';
import { LunaticState } from '../../type';

describe('getExpressionVariables', () => {
	const cases = [['(READY)', ['READY']]] as const;
	const declaredVariables: LunaticState['variables'] = {
		READY: {
			type: 'COLLECTED',
			value: true,
		},
	};
	for (const [expression, variables] of cases) {
		test(`it should convert find variables in \`${expression}\``, () => {
			expect(getExpressionVariables(expression, declaredVariables)).toBe(
				variables
			);
		});
	}
});

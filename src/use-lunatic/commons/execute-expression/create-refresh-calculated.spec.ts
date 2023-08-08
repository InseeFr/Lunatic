import { describe, expect, it } from 'vitest';
import { LunaticExpression, LunaticState } from '../../type';
import { ExpressionLogger } from './create-execute-expression';
import createRefreshCalculated from './create-refresh-calculated';

const variables = {
	AGE: {
		type: 'COLLECTED',
		value: null,
		variable: {
			variableType: 'COLLECTED',
			values: {
				PREVIOUS: null,
				COLLECTED: null,
				FORCED: null,
				EDITED: null,
				INPUTED: null,
			},
			name: 'AGE',
		},
	},
	COUNT_AGES: {
		type: 'CALCULATED',
		value: null,
		variable: {
			variableType: 'CALCULATED',
			name: 'COUNT_AGES',
			expression: { value: 'AGE.length', type: 'VTL' },
			bindingDependencies: ['AGE'],
			inFilter: 'true',
		},
	},
	AGE_ONE_PLUS: {
		type: 'CALCULATED',
		value: null,
		variable: {
			variableType: 'CALCULATED',
			name: 'AGE_ONE_PLUS',
			expression: { value: 'AGE + 1', type: 'VTL' },
			bindingDependencies: ['AGE'],
			inFilter: 'true',
			shapeFrom: 'AGE',
		},
	},
} satisfies LunaticState['variables'];

/**
 * Execute JavaScript expression to simulate VTL behaviour
 */
const fakeExecute =
	(bindings: Record<string, unknown>) =>
	(
		expression: unknown,
		options: {
			iteration?: number;
			linksIterations?: number[];
			logging?: ExpressionLogger;
		} = {}
	): unknown => {
		// Assume this code doesn't provide vulnerabilities (only in test)
		// eslint-disable-next-line no-new-func
		return new Function(
			...Object.keys(bindings),
			`return ${(expression as LunaticExpression).value}`
		)(
			...Object.values(bindings).map((value) => {
				return options.iteration !== undefined && Array.isArray(value)
					? value[options.iteration]
					: value;
			})
		);
	};

describe('createRefreshCalculated', () => {
	it('should recalculate simple variable', () => {
		const bindings: Record<string, unknown> = {
			AGE: [10, 20, 30],
		};
		const [refresh] = createRefreshCalculated({
			variables,
			execute: fakeExecute(bindings),
			bindings,
		});
		expect(refresh(variables, {}).COUNT_AGES).toBe(3);
		expect(refresh(variables, { iteration: 1 }).COUNT_AGES).toBe(3);
		expect(bindings.AGE).toEqual([10, 20, 30]);
		expect(bindings.COUNT_AGES).toEqual(3);
	});
	it('should recalculate loop variables', () => {
		const bindings: Record<string, unknown> = {
			AGE: [10, 20, 30],
		};
		const [refresh] = createRefreshCalculated({
			variables,
			execute: fakeExecute(bindings),
			bindings,
		});
		expect(refresh(variables).AGE_ONE_PLUS).toEqual([11, 21, 31]);
		expect(bindings.AGE).toEqual([10, 20, 30]);
		expect(bindings.AGE_ONE_PLUS).toEqual([11, 21, 31]);
	});
	it('should recalculate loop variables with specific iteration', () => {
		const bindings: Record<string, unknown> = {
			AGE: [10, 20, 30],
		};
		const [refresh] = createRefreshCalculated({
			variables,
			execute: fakeExecute(bindings),
			bindings,
		});
		expect(refresh(variables, { iteration: 1 }).AGE_ONE_PLUS).toEqual(21);
		expect(bindings.AGE).toEqual([10, 20, 30]);
		expect(bindings.AGE_ONE_PLUS).toEqual([11, 21, 31]);
	});
});

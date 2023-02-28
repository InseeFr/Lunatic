import { describe, it, expect } from 'vitest';
import createRefreshCalculated from './create-refresh-calculated';
import { ExpressionLogger } from './create-execute-expression';
import { LunaticExpression, LunaticState } from '../../type';
import { extractValue } from '../../../utils/array';

const collectedVariable = (name: string) =>
	({
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
			name: name,
		},
	} as const);

const variables = {
	AGE: collectedVariable('AGE'),
	PRENOM: collectedVariable('PRENOM'),
	PRENOM_CHILDREN: collectedVariable('PRENOM_CHILDREN'),
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
	PRENOM_DOUBLE: {
		type: 'CALCULATED',
		value: null,
		variable: {
			variableType: 'CALCULATED',
			name: 'PRENOM_DOUBLE',
			expression: { value: 'PRENOM + PRENOM', type: 'VTL' },
			bindingDependencies: ['PRENOM'],
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
	PRENOM_CHILDREN_LENGTH: {
		type: 'CALCULATED',
		value: null,
		variable: {
			variableType: 'CALCULATED',
			name: 'PRENOM_CHILDREN_LENGTH',
			expression: { value: 'PRENOM_CHILDREN.length', type: 'VTL' },
			bindingDependencies: ['PRENOM_CHILDREN'],
			inFilter: 'true',
			shapeFrom: 'PRENOM_CHILDREN',
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
			iteration?: number[];
			linksIterations?: number[];
			logging?: ExpressionLogger;
		} = {}
	): unknown => {
		try {
			return new Function(
				...Object.keys(bindings),
				`return ${(expression as LunaticExpression).value}`
			)(
				...Object.values(bindings).map((value) => {
					return options.iteration !== undefined && Array.isArray(value)
						? extractValue(value, options.iteration)
						: value;
				})
			);
		} catch (err) {
			return undefined;
		}
	};

describe('createRefreshCalculated', () => {
	it('should recalculate simple variable', () => {
		const bindings: Record<string, unknown> = {
			AGE: [10, 20, 30],
			PRENOM: 'John',
		};
		const [refresh] = createRefreshCalculated({
			variables,
			execute: fakeExecute(bindings),
			bindings,
		});
		expect(refresh(variables, {}).COUNT_AGES).toBe(3);
		expect(refresh(variables, {}).PRENOM_DOUBLE).toBe('JohnJohn');
		expect(refresh(variables, { iteration: [1] }).COUNT_AGES).toBe(3);
		expect(bindings.AGE).toEqual([10, 20, 30]);
		expect(bindings.COUNT_AGES).toEqual(3);
	});
	it('should recalculate loop variables', () => {
		const bindings: Record<string, unknown> = {
			AGE: [10, 20, 30],
			PRENOM: 'John',
			PRENOM_CHILDREN: [],
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
			PRENOM: 'John',
			PRENOM_CHILDREN: [],
		};
		const [refresh] = createRefreshCalculated({
			variables,
			execute: fakeExecute(bindings),
			bindings,
		});
		expect(refresh(variables, { iteration: [1] }).AGE_ONE_PLUS).toEqual(21);
		expect(bindings.AGE).toEqual([10, 20, 30]);
		expect(bindings.AGE_ONE_PLUS).toEqual([11, 21, 31]);
	});
	it('should handle loop of loop', () => {
		const bindings: Record<string, unknown> = {
			AGE: [10, 20, 30],
			PRENOM: 'John',
			PRENOM_CHILDREN: [
				['John', 'Janes'],
				['aa', 'bbb'],
			],
		};
		const [refresh] = createRefreshCalculated({
			variables,
			execute: fakeExecute(bindings),
			bindings,
		});
		expect(refresh(variables).PRENOM_CHILDREN_LENGTH).toEqual([
			[4, 5],
			[2, 3],
		]);
	});
});

import { describe, it, expect, vi } from 'vitest';
import type { LunaticReducerState } from '../type';
import type { ComponentDefinition, InterpretedComponent } from './component';
import { computeIterations } from './compile-controls';

// Mock de la fonction executeExpression
const mockExecuteExpression =
	vi.fn() as LunaticReducerState['executeExpression'];

describe('computeIterations', () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	it('should return iterations directly if it is a number', () => {
		const component: InterpretedComponent = {
			id: 'test',
			componentType: 'Loop',
			iterations: 5,
		};
		expect(computeIterations(component, mockExecuteExpression)).toBe(5);
	});

	it('should execute VTL expression for iterations if it is an object', () => {
		const component: ComponentDefinition = {
			id: 'test',
			componentType: 'Loop',
			iterations: { type: 'VTL', value: 'count(ARRAY)' },
		};
		mockExecuteExpression.mockReturnValue(3);
		expect(computeIterations(component, mockExecuteExpression)).toBe(3);
		expect(mockExecuteExpression).toHaveBeenCalledWith({
			type: 'VTL',
			value: 'count(ARRAY)',
		});
	});

	it('should return array length if component has a response with an array value', () => {
		const component: ComponentDefinition = {
			id: 'test',
			componentType: 'Question',
			response: { name: 'ARRAY' },
		};
		mockExecuteExpression.mockReturnValue(['a', 'b', 'c', 'd']);
		expect(computeIterations(component, mockExecuteExpression)).toBe(4);
		expect(mockExecuteExpression).toHaveBeenCalledWith({
			type: 'VTL',
			value: 'ARRAY',
		});
	});

	it('should return 0 if response value is not an array', () => {
		const component: ComponentDefinition = {
			id: 'test',
			componentType: 'Question',
			response: { name: 'VAR' },
		};
		mockExecuteExpression.mockReturnValue('not an array');
		expect(computeIterations(component, mockExecuteExpression)).toBe(0);
	});

	it('should return max iterations of children if component has components', () => {
		const component: ComponentDefinition = {
			id: 'parent',
			componentType: 'Loop',
			components: [
				{ id: 'child1', componentType: 'Question', iterations: 2 },
				{ id: 'child2', componentType: 'Question', iterations: 5 },
			],
		};
		expect(computeIterations(component, mockExecuteExpression)).toBe(5);
	});

	it('should return 0 if no iterations, response, or components are present', () => {
		const component: ComponentDefinition = {
			id: 'test',
			componentType: 'Question',
		};
		expect(computeIterations(component, mockExecuteExpression)).toBe(0);
	});

	it('should return 0 if iterations is null or undefined', () => {
		const component1: ComponentDefinition = {
			id: 'test1',
			componentType: 'Loop',
			iterations: null as unknown as number,
		};
		const component2: ComponentDefinition = {
			id: 'test2',
			componentType: 'Loop',
			iterations: undefined as unknown as number,
		};
		expect(computeIterations(component1, mockExecuteExpression)).toBe(0);
		expect(computeIterations(component2, mockExecuteExpression)).toBe(0);
	});

	it('should return 0 if all children have no iterations', () => {
		const component: ComponentDefinition = {
			id: 'parent',
			componentType: 'Loop',
			components: [
				{ id: 'child1', componentType: 'Question' },
				{ id: 'child2', componentType: 'Question' },
			],
		};
		expect(computeIterations(component, mockExecuteExpression)).toBe(0);
	});

	it('should prioritize iterations over response if both are present', () => {
		const component: ComponentDefinition = {
			id: 'test',
			componentType: 'Loop',
			iterations: 3,
			response: { name: 'ARRAY' },
		};
		mockExecuteExpression.mockReturnValue(['a', 'b', 'c', 'd', 'e']);
		expect(computeIterations(component, mockExecuteExpression)).toBe(3);
		expect(mockExecuteExpression).not.toHaveBeenCalled();
	});

	it('should prioritize iterations expression over response if both are present', () => {
		const component: ComponentDefinition = {
			id: 'test',
			componentType: 'Loop',
			iterations: { type: 'VTL', value: 'count(ARRAY)' },
			response: { name: 'ANOTHER_ARRAY' },
		};
		mockExecuteExpression.mockReturnValue(7);
		expect(computeIterations(component, mockExecuteExpression)).toBe(7);
		expect(mockExecuteExpression).toHaveBeenCalledWith({
			type: 'VTL',
			value: 'count(ARRAY)',
		});
	});
});

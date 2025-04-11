import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { getOptionsProp } from './propOptions';
import type { DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
} from '../type';

describe('getOptionsProp()', () => {
	let variables: LunaticVariablesStore;
	const checkboxGroupDefinition = {
		id: 'CheckboxGroup',
		componentType: 'CheckboxGroup',
		responses: [
			{
				label: 'Option 1',
				response: { name: 'O1' },
				id: 'id1',
			},
			{
				label: 'Option 2',
				response: { name: 'O2' },
				id: 'id2',
			},
		],
	} satisfies DeepTranslateExpression<LunaticComponentDefinition>;
	let mockChange: LunaticChangesHandler;
	const mockLogger = vi.fn();

	beforeEach(() => {
		mockChange = vi.fn();
		variables = new LunaticVariablesStore();
	});

	describe('CheckboxGroup', () => {
		it('should check boxes', () => {
			variables.set('O2', false);
			let options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);
			expect(options[1].checked).toBe(false);
			variables.set('O2', true);
			options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);
			expect(options[1].checked).toBe(true);
		});
		it('should check boxes correctly within iteration', () => {
			variables.set('O1', []);
			variables.set('O2', []);
			let options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				0,
				undefined,
				mockLogger
			);
			expect(
				options.filter((o) => o.checked),
				'Nothing checked when variable empty'
			).toHaveLength(0);

			variables.set('O1', [true, 0]);
			options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				0,
				undefined,
				mockLogger
			);
			expect(options[0].checked).toBe(true);
			expect(options[1].checked).toBe(false);
		});
		it('should create handleChange correctly', () => {
			variables.set('O1', [true, false]);
			variables.set('O2', [false, true]);
			const options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				1,
				undefined,
				mockLogger
			);
			options[1].onCheck(false);
			expect(mockChange).toHaveBeenLastCalledWith([
				{ name: 'O2', value: false },
			]);
		});
		it('should not filter response (checkboxGroup) when its conditionFilter evaluation fails', () => {
			const definition = {
				...checkboxGroupDefinition,
				responses: [
					{
						label: 'Option 1',
						response: { name: 'O1' },
						id: 'id1',
						conditionFilter: { type: 'VTL', value: 'invalid expression' },
					},
				],
			} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

			// mock variables.run for having an error interpreting a variable
			vi.spyOn(variables, 'run').mockImplementation(() => {
				throw new Error('Test error');
			});

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);

			// Ensure the option is not filtered
			expect(options).toHaveLength(1);
		});
		it('should not filter option (radio) when its conditionFilter evaluation fails', () => {
			const definition = {
				id: 'RadioGroup',
				componentType: 'Radio',
				options: [
					{
						label: 'Option 1',
						value: 'id1',
						conditionFilter: { type: 'VTL', value: 'invalid expression' },
					},
				],
			} as any as DeepTranslateExpression<LunaticComponentDefinition>;

			// Mock `variables.run` to throw an error
			vi.spyOn(variables, 'run').mockImplementation(() => {
				throw new Error('Test error');
			});

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);

			// Ensure the option is not filtered
			expect(options).toHaveLength(1);
		});
		it('should not filter any response (CheckboxGroup) when disableFilters is true', () => {
			const definition = {
				...checkboxGroupDefinition,
				responses: [
					{
						label: 'Option 1',
						response: { name: 'O1' },
						id: 'id1',
						conditionFilter: { type: 'VTL', value: 'expression' },
					},
				],
			} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

			// ensure interpreted expression is false
			vi.spyOn(variables, 'run').mockImplementation(() => {
				return false;
			});

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger,
				true // disableFilters = true
			);

			// Ensure the option is not filtered
			expect(options).toHaveLength(1);
		});
		it('should not filter any option (Radio) when disableFilters is true', () => {
			const radioDefinition = {
				id: 'RadioGroup',
				componentType: 'Radio',
				options: [
					{
						label: 'Option 1',
						value: 'id1',
						conditionFilter: { type: 'VTL', value: 'expression' },
					},
				],
			} as any as DeepTranslateExpression<LunaticComponentDefinition>;

			// ensure interpreted expression is false
			vi.spyOn(variables, 'run').mockImplementation(() => {
				return false;
			});

			const options = getOptionsProp(
				radioDefinition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger,
				true // disableFilters = true
			);

			expect(options).toHaveLength(1);
		});
	});
});

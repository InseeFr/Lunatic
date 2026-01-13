import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { getOptionsProp, InterpretedOption } from './propOptions';
import type { DeepTranslateExpression } from '../commons/fill-components/fill-component-expressions';
import type {
	LunaticChangesHandler,
	LunaticComponentDefinition,
} from '../type';

describe('getOptionsProp()', () => {
	let variables: LunaticVariablesStore;

	let mockChange: LunaticChangesHandler;
	const mockLogger = vi.fn();

	beforeEach(() => {
		mockChange = vi.fn();
		variables = new LunaticVariablesStore();
	});

	describe('Options based on a fixed list', () => {
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

		const radioDefinition = {
			id: 'RadioGroup',
			componentType: 'Radio',
			response: { name: 'RADIO' },
			options: [
				{
					label: 'Option 1',
					value: 'id1',
				},
				{
					label: 'Option 2',
					value: 'id2',
				},
			],
		} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

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
			options[1].onCheck?.(false);
			expect(mockChange).toHaveBeenLastCalledWith([
				{ name: 'O2', value: false },
			]);
		});
		it('should create detail props correctly for checkboxGroup', () => {
			const definition = {
				...checkboxGroupDefinition,
				responses: [
					{
						label: 'Option 1',
						response: { name: 'O1' },
						id: 'id1',
						detail: {
							label: 'Precize:',
							response: { name: 'DETAIL' },
							maxLength: 50,
						},
					},
					{
						label: 'Option 2',
						response: { name: 'O2' },
						id: 'id2',
						detail: {
							label: 'Precize:',
							response: { name: 'DETAILBIS' },
						},
					},
				],
			} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

			variables.set('DETAIL', true);

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);

			expect(options).toHaveLength(2);
			expect(options[0].detailLabel).toBe('Precize:');
			expect(options[1].detailLabel).toBe('Precize:');
			expect(options[0].detailValue).toBe(true);
			expect(options[1].detailValue).toBeNull();
			expect(options[0].detailMaxLength).toBe(50);
			expect(options[1].detailMaxLength).toBeUndefined();
		});
		it('should create detail props correctly for Radiogroup', () => {
			const definition = {
				...radioDefinition,
				options: [
					{
						label: 'Option 1',
						value: 'id1',
						detail: {
							label: 'Precize:',
							response: { name: 'DETAIL' },
							maxLength: 50,
						},
					},
					{
						label: 'Option 2',
						value: 'id2',
						detail: {
							label: 'Precize:',
							response: { name: 'DETAILBIS' },
						},
					},
				],
			} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

			variables.set('DETAIL', true);

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);

			expect(options).toHaveLength(2);
			expect(options[0].detailLabel).toBe('Precize:');
			expect(options[1].detailLabel).toBe('Precize:');
			expect(options[0].detailValue).toBe(true);
			expect(options[1].detailValue).toBeNull();
			expect(options[0].detailMaxLength).toBe(50);
			expect(options[1].detailMaxLength).toBeUndefined();
		});
		it('should filter responses (CheckboxGroup) with conditionFilter evaluated to false', () => {
			const definition = {
				...checkboxGroupDefinition,
				responses: [
					{
						label: 'Option 1',
						response: { name: 'O1' },
						id: 'id1',
						conditionFilter: { type: 'VTL', value: 'false' },
					},
					{
						label: 'Option 2',
						response: { name: 'O2' },
						id: 'id2',
						conditionFilter: { type: 'VTL', value: 'true' },
					},
				],
			} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);

			// First option should be filtered out since its conditionFilter is evaluated to false
			expect(options).toHaveLength(1);
			expect(options[0].label).toBe('Option 2');
		});
		it('should filter options (Radio) with conditionFilter evaluated to false', () => {
			const definition = {
				...radioDefinition,
				options: [
					{
						label: 'Option 1',
						value: 'id1',
						conditionFilter: { type: 'VTL', value: 'false' },
					},
					{
						label: 'Option 2',
						value: 'id2',
						conditionFilter: { type: 'VTL', value: 'true' },
					},
				],
			} as any as DeepTranslateExpression<LunaticComponentDefinition>;

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			);

			// First option should be filtered out since its conditionFilter is evaluated to false
			expect(options).toHaveLength(1);
			expect(options[0].label).toBe('Option 2');
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
			expect(options[0].shouldBeFiltered).toBe(false);
		});
		it('should not filter option (radio) when its conditionFilter evaluation fails', () => {
			const definition = {
				...radioDefinition,
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
			expect(options[0].shouldBeFiltered).toBe(false);
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
			// the option should would have been filtered if we did not disable filters
			expect(options[0].shouldBeFiltered).toBe(true);
		});
		it('should not filter any option (Radio) when disableFilters is true', () => {
			const definition = {
				...radioDefinition,
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
			// the option should would have been filtered if we did not disable filters
			expect(options[0].shouldBeFiltered).toBe(true);
		});
		it('should set the response (CheckboxGroup) shouldBeFiltered=true when the parent component should be filtered', () => {
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

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger,
				true, // disableFilters = true
				true // parent component should be filtered
			);

			// Ensure the option is not filtered
			expect(options).toHaveLength(1);
			// the option would have been filtered if we did not disable filters because its parent would
			expect(options[0].shouldBeFiltered).toBe(true);
		});
		it('should set the option (Radio) shouldBeFiltered=true when the parent component should be filtered', () => {
			const definition = {
				...radioDefinition,
				options: [
					{
						label: 'Option 1',
						value: 'id1',
						conditionFilter: { type: 'VTL', value: 'expression' },
					},
				],
			} as any as DeepTranslateExpression<LunaticComponentDefinition>;

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger,
				true, // disableFilters = true
				true // parent component should be filtered
			);

			// Ensure the option is not filtered
			expect(options).toHaveLength(1);
			// the option would have been filtered if we did not disable filters because its parent would
			expect(options[0].shouldBeFiltered).toBe(true);
		});
	});

	describe('Options based on a source variable', () => {
		const radioOptionSourceDefinition = {
			id: 'RadioGroupDynamic',
			componentType: 'Radio',
			response: { name: 'RADIO' },
			optionSource: 'NAME',
		} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

		it('should build options when the source variable is an array of strings', () => {
			variables.set('NAME', ['Maëlle', 'Verso']);
			const options = getOptionsProp(
				radioOptionSourceDefinition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			) as InterpretedOption[]; // force type but it should infer type correctly

			expect(options).toHaveLength(2);
			expect(options[0].value).toBe('Maëlle');
			expect(options[0].label).toBe('Maëlle');
			expect(options[1].value).toBe('Verso');
			expect(options[1].label).toBe('Verso');
		});

		it('should build options when the source variable is an array of numbers', () => {
			variables.set('NAME', [10, 20]);
			const options = getOptionsProp(
				radioOptionSourceDefinition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			) as InterpretedOption[]; // force type but it should infer type correctly

			expect(options).toHaveLength(2);
			expect(options[0].value).toBe(10);
			expect(options[0].label).toBe('10');
			expect(options[1].value).toBe(20);
			expect(options[1].label).toBe('20');
		});

		it('should set the response when selecting a dynamic option', () => {
			variables.set('NAME', ['Maëlle', 'Verso']);
			const options = getOptionsProp(
				radioOptionSourceDefinition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			) as InterpretedOption[]; // force type but it should infer type correctly

			options[0].onCheck?.();
			expect(mockChange).toHaveBeenLastCalledWith([
				{ name: 'RADIO', value: 'Maëlle' },
			]);

			options[1].onCheck?.();
			expect(mockChange).toHaveBeenLastCalledWith([
				{ name: 'RADIO', value: 'Verso' },
			]);
		});

		it('should filter options based on the optionFilter expression', () => {
			const definition = {
				...radioOptionSourceDefinition,
				optionFilter: { type: 'VTL', value: 'AGE >= 18' },
			} satisfies DeepTranslateExpression<LunaticComponentDefinition>;

			variables.set('NAME', ['Maëlle', 'Verso', 'Aline']);
			variables.set('AGE', [16, 30, 50]);

			const options = getOptionsProp(
				definition,
				variables,
				mockChange,
				undefined,
				undefined,
				mockLogger
			) as InterpretedOption[]; // force type but it should infer type correctly

			expect(options.map((option) => option.value)).toEqual(['Verso', 'Aline']);
		});
	});
});

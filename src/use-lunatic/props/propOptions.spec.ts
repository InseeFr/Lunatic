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
				undefined
			);
			expect(options[1].checked).toBe(false);
			variables.set('O2', true);
			options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				undefined,
				undefined
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
				undefined
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
				undefined
			);
			expect(options[0].checked).toBe(true);
			expect(options[1].checked).toBe(false);
		});
		it('should create handleChange correctly', () => {
			variables.set('O1', [true, false]);
			variables.set('O2', [false, true]);
			let options = getOptionsProp(
				checkboxGroupDefinition,
				variables,
				mockChange,
				1,
				undefined
			);
			options[1].onCheck(false);
			expect(mockChange).toHaveBeenLastCalledWith([
				{ name: 'O2', value: false },
			]);
		});
	});
});

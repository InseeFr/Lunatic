import { describe, expect, it } from 'vitest';
import { fillComponentValue } from './fill-component-value';
import { LunaticVariablesStore } from '../variables/lunatic-variables-store';
import type { LunaticComponentDefinition } from '../../type';
import { times } from '../../../utils/array';

describe('fillComponentValue', () => {
	// Helper to avoid repetition
	const expectFilledComponent = (
		component: LunaticComponentDefinition,
		// Value in the lunatic state
		values: Record<string, unknown> = {},
		// Pager iteration
		iteration?: number
	) => {
		return expect(
			fillComponentValue(component, {
				variables: LunaticVariablesStore.makeFromObject(values),
				pager: {
					maxPage: '2',
					page: '1',
					iteration,
				},
			}).value
		);
	};

	describe('response', () => {
		const component = {
			response: { name: 'PRENOM' },
		} as LunaticComponentDefinition<'Input'>;

		it('Should work with simple response', () => {
			expectFilledComponent(component, { PRENOM: 'John' }).toBe('John');
			expectFilledComponent(component).toBe(null);
		});

		it('Should work with simple response as Array', () => {
			expectFilledComponent(component, { PRENOM: ['John', 'Renaud'] }, 1).toBe(
				'Renaud'
			);
			expectFilledComponent(component, { PRENOM: ['John', 'Renaud'] }, 3).toBe(
				undefined
			);
		});
	});
	describe('responses', () => {
		const component = {
			responses: times(3, (k) => ({
				response: { name: `NAME${k}` },
			})),
		} as LunaticComponentDefinition<'CheckboxGroup'>;

		it('should work with multiple responses', () => {
			expectFilledComponent(component).toEqual({
				NAME0: null,
				NAME1: null,
				NAME2: null,
			});
			expectFilledComponent(component, { NAME1: true }).toEqual({
				NAME0: null,
				NAME1: true,
				NAME2: null,
			});
		});
	});
});

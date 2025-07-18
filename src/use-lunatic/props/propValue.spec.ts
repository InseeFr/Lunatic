import { describe, expect, it } from 'vitest';
import { getValueProp } from './propValue';
import type { LunaticComponentDefinition } from '../type';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { times } from '../../utils/array';

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
			getValueProp(component, {
				variables: LunaticVariablesStore.makeFromObject(values),
				pager: {
					maxPage: 2,
					page: 1,
					iteration,
				},
			})
		);
	};

	describe('single response', () => {
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
	describe('multiple responses', () => {
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

	describe('Loop component with nested components', () => {
		const loopComponent = {
			id: 'm7j9kwro',
			componentType: 'Loop',
			components: [
				{
					id: 'm7j9iem8',
					componentType: 'Sequence',
				},
				{
					id: 'question-m7j9q1ep',
					componentType: 'Question',
					components: [
						{
							id: 'm7j9q1ep',
							componentType: 'Input',
							response: { name: 'VOTREPRENO' },
						},
					],
				},
				{
					id: 'question-m7jb81xh',
					componentType: 'Question',
					components: [
						{
							id: 'm7jb81xh',
							componentType: 'InputNumber',
							response: { name: 'VOTREAGE' },
						},
					],
				},
			],
		} as LunaticComponentDefinition;

		it('should correctly extract values from nested responses as arrays', () => {
			const values = {
				VOTREPRENO: ['Alice', 'Bob', 'Charlie'],
				VOTREAGE: [22, 30, 40],
			};

			expectFilledComponent(loopComponent, values).toEqual(values);
		});

		it('should return null for missing responses', () => {
			expectFilledComponent(loopComponent).toEqual({
				VOTREPRENO: null,
				VOTREAGE: null,
			});
		});
	});

	describe('RosterForLoop with suggester having optionResponses', () => {
		const rosterForLoopComponent = {
			id: 'loop-prenom',
			componentType: 'RosterForLoop',
			bindingDependencies: ['PRENOM'],
			lines: {
				min: {
					value: '1',
					type: 'VTL',
				},
				max: {
					value: '10',
					type: 'VTL',
				},
			},
			page: '1',
			components: [
				{
					componentType: 'Input',
					label: {
						value: '"Prénom"',
						type: 'VTL|MD',
					},
					conditionFilter: {
						value: 'true',
						type: 'VTL',
					},
					maxLength: 30,
					bindingDependencies: ['PRENOM'],
					id: 'prenom',
					response: {
						name: 'PRENOM',
					},
				},
				{
					id: 'commune',
					response: {
						name: 'COMMUNE',
					},
					storeName: 'nomenclature-commune',
					componentType: 'Suggester',
					optionResponses: [
						{
							name: 'LABEL_COMMUNE',
							attribute: 'label_attribute',
						},
					],
				},
			],
		} as any as LunaticComponentDefinition<'RosterForLoop'>;

		it('should correctly extract values from nested responses as arrays', () => {
			const values = {
				PRENOM: ['Alice', 'Bob', 'Charlie'],
				COMMUNE: ['59000', '25000', '54000'],
				LABEL_COMMUNE: ['Lille', 'Besançon', 'Nancy'],
			};

			expectFilledComponent(rosterForLoopComponent, values).toEqual(values);
		});

		it('should return null for missing responses', () => {
			expectFilledComponent(rosterForLoopComponent).toEqual({
				PRENOM: null,
				COMMUNE: null,
				LABEL_COMMUNE: null,
			});
		});
	});
});

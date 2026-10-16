import { describe, expect, it } from 'vitest';
import type { LunaticSource } from '../type';
import { removeConditionFilters } from './remove-condition-filters';

const externalFilter = {
	type: 'VTL',
	value: 'CADRE = "OUI"',
	variablesDependencies: { EXTERNAL: ['CADRE'], COLLECTED: [], CALCULATED: [] },
};

const collectedFilter = {
	type: 'VTL',
	value: 'NAME = "Paul"',
	variablesDependencies: { EXTERNAL: [], COLLECTED: ['NAME'], CALCULATED: [] },
};

const calculatedFilter = {
	type: 'VTL',
	value: 'HAS_NAME',
	variablesDependencies: {
		EXTERNAL: [],
		COLLECTED: [],
		CALCULATED: ['HAS_NAME'],
	},
};

const source = {
	variables: [],
	components: [
		{
			id: 'outside-loop',
			page: '1',
			componentType: 'Question',
			conditionFilter: externalFilter,
			components: [
				{
					id: 'radio',
					componentType: 'Radio',
					response: { name: 'ANSWER' },
					options: [
						{ value: 'yes', label: 'Yes', conditionFilter: externalFilter },
						{ value: 'no', label: 'No', conditionFilter: collectedFilter },
					],
				},
				{
					id: 'checkboxes',
					componentType: 'CheckboxGroup',
					responses: [
						{
							id: 'external-response',
							label: 'External',
							response: { name: 'EXTERNAL_RESPONSE' },
							conditionFilter: externalFilter,
						},
						{
							id: 'calculated-response',
							label: 'Calculated',
							response: { name: 'CALCULATED_RESPONSE' },
							conditionFilter: calculatedFilter,
						},
					],
				},
			],
		},
		{
			id: 'loop',
			page: '2',
			componentType: 'Loop',
			paginatedLoop: false,
			iterations: { type: 'VTL', value: '2' },
			conditionFilter: collectedFilter,
			components: [
				{
					id: 'loop-occurrence',
					componentType: 'Question',
					conditionFilter: collectedFilter,
					components: [],
				},
			],
		},
		{
			id: 'table',
			page: '3',
			componentType: 'Table',
			body: [
				[
					{
						id: 'table-cell-input',
						componentType: 'Input',
						response: { name: 'TABLE_CELL' },
						conditionFilter: collectedFilter,
					},
				],
			],
		},
	],
} as unknown as LunaticSource;

describe('removeConditionFilters', () => {
	it('keeps only external-only filters throughout components, options, and responses', () => {
		const cleaned = removeConditionFilters(source, 'EXTERNAL') as any;

		expect(cleaned.components[0].conditionFilter).toEqual(externalFilter);
		expect(cleaned.components[0].components[0].options).toEqual([
			{ value: 'yes', label: 'Yes', conditionFilter: externalFilter },
			{ value: 'no', label: 'No' },
		]);
		expect(cleaned.components[0].components[1].responses).toEqual([
			{
				id: 'external-response',
				label: 'External',
				response: { name: 'EXTERNAL_RESPONSE' },
				conditionFilter: externalFilter,
			},
			{
				id: 'calculated-response',
				label: 'Calculated',
				response: { name: 'CALCULATED_RESPONSE' },
			},
		]);
		expect(cleaned.components[1].conditionFilter).toBeUndefined();
		expect(cleaned.components[1].components[0].conditionFilter).toBeUndefined();
		expect(cleaned.components[2].body[0][0].conditionFilter).toBeUndefined();
	});

	it('removes filters recursively when activeFilters is NONE and preserves the source for ALL', () => {
		const withoutFilters = removeConditionFilters(source, 'NONE') as any;

		expect(withoutFilters.components[0].conditionFilter).toBeUndefined();
		expect(
			withoutFilters.components[0].components[0].options.every(
				(option: { conditionFilter?: unknown }) =>
					!('conditionFilter' in option)
			)
		).toBe(true);
		expect(
			withoutFilters.components[0].components[1].responses.every(
				(response: { conditionFilter?: unknown }) =>
					!('conditionFilter' in response)
			)
		).toBe(true);
		expect(
			withoutFilters.components[1].components[0].conditionFilter
		).toBeUndefined();
		expect(
			withoutFilters.components[2].body[0][0].conditionFilter
		).toBeUndefined();
		expect(removeConditionFilters(source, 'ALL')).toBe(source);
	});
});

import { describe, it, expect, vi } from 'vitest';
import { FillComponentArgs, fillComponents } from './fill-components';
import { LunaticComponentDefinition } from '../../type';
import { LunaticVariablesStore } from '../variables/lunatic-variables-store';

const defaultMockVariables = LunaticVariablesStore.makeFromObject({
	TESTTEXTE: 'Some test value',
});

const defaultMockState = {
	handleChanges: vi.fn(),
	executeExpression: (expression: any) => expression.value,
	goToPage: vi.fn(),
	goNextPage: vi.fn(),
	goPreviousPage: vi.fn(),
	logger: vi.fn(),
	pager: { page: 1, maxPage: 1 },
	variables: defaultMockVariables,
};

// in every test, filledComponents is forced to any type since the function
// fillComponent does not handle types well, returning object forced as any
describe('fillComponents', () => {
	it('should fill an Input component correctly', () => {
		const components = [
			{
				componentType: 'Input',
				response: {
					name: 'TESTINPUT',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
				id: 'kfxn6f16',
				page: '1',
				label: {
					type: 'VTL|MD',
					value: '"Input label"',
				},
				isMandatory: true,
				maxLength: 15,
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Some test value',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		const input = filledComponents[0];

		expect(input.componentType).toBe('Input');
		expect(input.id).toBe('kfxn6f16');
		expect(input.label).toBe('"Input label"');
		expect(input.response.name).toBe('TESTINPUT');
		expect(input.required).toBe(true);
		expect(input.maxLength).toBe(15);
		expect(input.conditionFilter).toBe(true);
		expect(input.shouldBeFiltered).toBe(false);
	});

	it('should fill a Radio component correctly with options', () => {
		const components = [
			{
				id: 'radio',
				componentType: 'Radio',
				mandatory: false,
				page: '1',
				label: {
					value: '"Radio label"',
					type: 'VTL|MD',
				},
				conditionFilter: {
					type: 'VTL',
					value: '"true"',
				},
				options: [
					{
						value: '1',
						description: {
							value: '"Déclaration oui"',
							type: 'VTL|MD',
						},
						label: {
							value: '"oui"',
							type: 'VTL|MD',
						},
					},
					{
						value: '2',
						description: {
							value: '"Déclaration non"',
							type: 'VTL|MD',
						},
						label: {
							value: '"non"',
							type: 'VTL|MD',
						},
					},
				],
				response: {
					name: 'TESTRADIO',
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTRADIO: '1',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		const radio = filledComponents[0];

		expect(radio.componentType).toBe('Radio');
		expect(radio.id).toBe('radio');
		expect(radio.label).toBe('"Radio label"');
		expect(radio.options).toHaveLength(2);
		expect(radio.options[0].label).toBe('"oui"');
		expect(radio.options[1].label).toBe('"non"');
		expect(radio.conditionFilter).toBe(true);
		expect(radio.shouldBeFiltered).toBe(false);
		expect(radio.response.name).toBe('TESTRADIO');
	});

	it('should fill a Question component with a child Input correctly', () => {
		const components = [
			{
				id: 'question-m8ilvkbt',
				componentType: 'Question',
				page: '1',
				label: {
					value: '"Question label"',
					type: 'VTL|MD',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
				components: [
					{
						id: 'm8ilvkbt',
						componentType: 'Input',
						page: '1',
						maxLength: 249,
						response: {
							name: 'TESTTEXTE',
						},
					},
				],
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTTEXTE: 'some value',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		const question = filledComponents[0];

		expect(question.componentType).toBe('Question');
		expect(question.id).toBe('question-m8ilvkbt');
		expect(question.label).toBe('"Question label"');
		expect(question.conditionFilter).toBe(true);
		expect(question.shouldBeFiltered).toBe(false);
		expect(question.components.length).toBe(1);

		const input = question.components[0];
		expect(input.componentType).toBe('Input');
		expect(input.id).toBe('m8ilvkbt');
		expect(input.maxLength).toBe(249);
		expect(input.response.name).toBe('TESTTEXTE');
	});

	it('should fill multiple components correctly', () => {
		const components = [
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				maxLength: 100,
				response: {
					name: 'TESTINPUT',
				},
				label: {
					type: 'VTL|MD',
					value: '"Input label"',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
			},
			{
				id: 'radio1',
				componentType: 'Radio',
				page: '1',
				label: {
					type: 'VTL|MD',
					value: '"Radio label"',
				},
				options: [
					{ value: 'yes', label: { value: '"Yes"', type: 'VTL|MD' } },
					{ value: 'no', label: { value: '"No"', type: 'VTL|MD' } },
				],
				response: {
					name: 'TESTRADIO',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Filled input',
			TESTRADIO: 'yes',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		expect(filledComponents).toHaveLength(2);

		const input = filledComponents[0];
		expect(input.componentType).toBe('Input');
		expect(input.response.name).toBe('TESTINPUT');
		expect(input.maxLength).toBe(100);
		expect(input.conditionFilter).toBe(true);
		expect(input.shouldBeFiltered).toBe(false);

		const radio = filledComponents[1];
		expect(radio.componentType).toBe('Radio');
		expect(radio.response.name).toBe('TESTRADIO');
		expect(radio.options[0].label).toBe('"Yes"');
		expect(radio.options[1].label).toBe('"No"');
		expect(radio.conditionFilter).toBe(true);
		expect(radio.shouldBeFiltered).toBe(false);
	});

	it('should filter out FilterDescription components if disableFiltersDescription is true', () => {
		const components = [
			{
				id: 'filter-desc',
				componentType: 'FilterDescription',
				page: '1',
				label: {
					type: 'VTL|MD',
					value: '"filter description"',
				},
			},
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				maxLength: 100,
				response: {
					name: 'TESTINPUT',
				},
				label: {
					type: 'VTL|MD',
					value: '"Input label"',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Filled input',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
			disableFiltersDescription: true,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		);

		expect(filledComponents).toHaveLength(1);

		const input = filledComponents[0];
		expect(input.componentType).toBe('Input');
	});

	it('should keep FilterDescription components if disableFiltersDescription is false', () => {
		const components = [
			{
				id: 'filter-desc',
				componentType: 'FilterDescription',
				page: '1',
				label: {
					type: 'VTL|MD',
					value: '"Some filter description"',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
			},
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				maxLength: 100,
				response: {
					name: 'TESTINPUT',
				},
				label: {
					type: 'VTL|MD',
					value: '"Input label"',
				},
				conditionFilter: {
					type: 'VTL',
					value: 'true',
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Filled input',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
			disableFiltersDescription: false,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		);

		expect(filledComponents).toHaveLength(2);
		expect(filledComponents[0].componentType).toBe('FilterDescription');
		expect(filledComponents[1].componentType).toBe('Input');
	});

	it('should filter out components with conditionFilter=false when disableFilters is false or undefined', () => {
		const components = [
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				response: {
					name: 'TESTINPUT',
				},
				label: {
					type: 'VTL|MD',
					value: '"Should be kept even with conditionFilter false"',
				},
				conditionFilter: {
					type: 'VTL',
					// value should be string, but did not find how to execute correctly with mocks
					// for having a false conditionFilter at the end
					value: false,
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Some value',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
			disableFilters: false,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		);

		expect(filledComponents).toHaveLength(0);
	});

	it('should not filter out components with conditionFilter=false when disableFilters is true', () => {
		const components = [
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				response: {
					name: 'TESTINPUT',
				},
				label: {
					type: 'VTL|MD',
					value: '"Should be kept even with conditionFilter false"',
				},
				conditionFilter: {
					type: 'VTL',
					// value should be string, but did not find how to execute correctly with mocks
					// for having a false conditionFilter at the end
					value: false,
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Some value',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
			disableFilters: true,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		expect(filledComponents).toHaveLength(1);

		const input = filledComponents[0];
		expect(input.id).toBe('input1');
		expect(input.conditionFilter).toBe(false);
		expect(input.shouldBeFiltered).toBe(true);
	});

	it('should transform components into Text with empty label when conditionFilter is false and parentType is RosterForLoop', () => {
		const components = [
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				label: { value: '"Input label"', type: 'VTL|MD' },
				conditionFilter: {
					type: 'VTL',
					// value should be string, but did not find how to execute correctly with mocks
					// for having a false conditionFilter at the end
					value: false,
				},
				response: { name: 'TESTINPUT' },
			},
			{
				id: 'radio1',
				componentType: 'Radio',
				page: '1',
				label: { value: '"Radio label"', type: 'VTL|MD' },
				options: [
					{ value: 'yes', label: { value: '"Yes"', type: 'VTL|MD' } },
					{ value: 'no', label: { value: '"No"', type: 'VTL|MD' } },
				],
				response: { name: 'TESTRADIO' },
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Filled input',
			TESTRADIO: 'yes',
		});

		const mockState = {
			...defaultMockState,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs,
			'RosterForLoop'
		) as any;

		expect(filledComponents).toHaveLength(2);

		// Check the first component that has conditionFilter: false
		const input = filledComponents[0];
		// The component should be transformed into a Text without label
		expect(input.componentType).toBe('Text');
		expect(input.label).toBe('');
		expect(input.id).toBe('input1');
		expect(input.conditionFilter).toBe(false);
		expect(input.shouldBeFiltered).toBe(true);

		// Check the second component that has conditionFilter: true
		const radio = filledComponents[1];
		// The component should remain unchanged
		expect(radio.componentType).toBe('Radio');
		expect(radio.label).toBe('"Radio label"');
		expect(radio.options[0].label).toBe('"Yes"');
		expect(radio.options[1].label).toBe('"No"');
	});

	it('should never transform components into Text when disableFilters is true', () => {
		const components = [
			{
				id: 'input1',
				componentType: 'Input',
				page: '1',
				label: { value: '"Input label"', type: 'VTL|MD' },
				conditionFilter: {
					type: 'VTL',
					// value should be string, but did not find how to execute correctly with mocks
					// for having a false conditionFilter at the end
					value: false,
				},
				response: { name: 'TESTINPUT' },
			},
			{
				id: 'radio1',
				componentType: 'Radio',
				page: '1',
				label: { value: '"Radio label"', type: 'VTL|MD' },
				options: [
					{ value: 'yes', label: { value: '"Yes"', type: 'VTL|MD' } },
					{ value: 'no', label: { value: '"No"', type: 'VTL|MD' } },
				],
				response: { name: 'TESTRADIO' },
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Filled input',
			TESTRADIO: 'yes',
		});

		const mockState = {
			...defaultMockState,
			disableFilters: true,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs,
			'RosterForLoop'
		) as any;

		expect(filledComponents).toHaveLength(2);

		// Check the first component that has conditionFilter: false
		const input = filledComponents[0];
		// The component should remain unchanged
		expect(input.componentType).toBe('Input');
		expect(input.label).toBe('"Input label"');
		expect(input.conditionFilter).toBe(false);
		expect(input.shouldBeFiltered).toBe(true);

		// Check the second component that has conditionFilter: true
		const radio = filledComponents[1];
		// The component should remain unchanged
		expect(radio.componentType).toBe('Radio');
		expect(radio.label).toBe('"Radio label"');
		expect(radio.options[0].label).toBe('"Yes"');
		expect(radio.options[1].label).toBe('"No"');
	});

	it('should tag children components with shouldBeFiltered=true if the parent component should be filtered', () => {
		const components = [
			{
				id: 'question-m8ilvkbt',
				componentType: 'Question',
				page: '1',
				label: {
					value: '"Question label"',
					type: 'VTL|MD',
				},
				conditionFilter: {
					type: 'VTL',
					// value should be string, but did not find how to execute correctly with mocks
					// for having a false conditionFilter at the end
					value: false,
				},
				components: [
					{
						id: 'm8ilvkbt',
						componentType: 'Input',
						page: '1',
						maxLength: 249,
						response: {
							name: 'TESTTEXTE',
						},
					},
				],
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTTEXTE: 'some value',
		});

		const mockState = {
			...defaultMockState,
			disableFilters: true,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		const question = filledComponents[0];

		expect(question.componentType).toBe('Question');
		expect(question.conditionFilter).toBe(false);
		expect(question.shouldBeFiltered).toBe(true);

		const input = question.components[0];
		expect(input.componentType).toBe('Input');
		expect(input.conditionFilter).toBe(undefined);
		expect(input.shouldBeFiltered).toBe(true);
	});

	it('should tag options with shouldBeFiltered=true if the component should be filtered', () => {
		const components = [
			{
				id: 'radio1',
				componentType: 'Radio',
				page: '1',
				label: {
					type: 'VTL|MD',
					value: '"Radio label"',
				},
				options: [
					{ value: 'yes', label: { value: '"Yes"', type: 'VTL|MD' } },
					{ value: 'no', label: { value: '"No"', type: 'VTL|MD' } },
				],
				response: {
					name: 'TESTRADIO',
				},
				conditionFilter: {
					type: 'VTL',
					// value should be string, but did not find how to execute correctly with mocks
					// for having a false conditionFilter at the end
					value: false,
				},
			},
		];

		const mockVariables = LunaticVariablesStore.makeFromObject({
			TESTINPUT: 'Filled input',
			TESTRADIO: 'yes',
		});

		const mockState = {
			...defaultMockState,
			disableFilters: true,
			variables: mockVariables,
		};

		const filledComponents = fillComponents(
			components as LunaticComponentDefinition[],
			mockState as unknown as FillComponentArgs
		) as any;

		const radio = filledComponents[0];

		expect(radio.componentType).toBe('Radio');
		expect(radio.conditionFilter).toBe(false);
		expect(radio.shouldBeFiltered).toBe(true);

		expect(radio.options[0].label).toBe('"Yes"');
		expect(radio.options[0].conditionFilter).toBe(undefined);
		expect(radio.options[0].shouldBeFiltered).toBe(true);

		expect(radio.options[1].label).toBe('"No"');
		expect(radio.options[1].conditionFilter).toBe(undefined);
		expect(radio.options[1].shouldBeFiltered).toBe(true);
	});
});

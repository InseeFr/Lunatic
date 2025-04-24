import { describe, expect, it, vi } from 'vitest';
import { getIterationsProp } from './propIterations';
import { LunaticVariablesStore } from '../commons/variables/lunatic-variables-store';
import { LunaticComponentDefinition } from '../type';

const defaultMockVariables = LunaticVariablesStore.makeFromObject({
	NAME: ['Nergigante', 'Rathalos', 'Kirin'],
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

describe('propIterations', () => {
	it('computes iterations from responses in a Loop component', () => {
		const components: LunaticComponentDefinition = {
			id: 'm1azzo4j',
			page: '3',
			lines: {
				max: {
					type: 'VTL',
					value: 'NBDIND + 2',
				},
				min: {
					type: 'VTL',
					value: 'NBDIND',
				},
			},
			header: [
				{
					label: {
						type: 'VTL|MD',
						value: '"prenom"',
					},
				},
			],
			componentType: 'Loop',
			components: [
				{
					id: 'm48p7i3p',
					page: '3',
					label: {
						type: 'VTL|MD',
						value: '"People names"',
					},
					goToPage: '3',
					componentType: 'Subsequence',
					conditionFilter: {
						type: 'VTL',
						value: 'true',
					},
				},
				{
					id: 'question-m48ph1pw',
					page: '3',
					label: {
						type: 'VTL|MD',
						value: '"name"',
					},
					components: [
						{
							id: 'm48ph1pw',
							page: '3',
							response: {
								name: 'NAME',
							},
							maxLength: 249,
							isMandatory: false,
							componentType: 'Input',
						},
					],
					declarations: [
						{
							id: 'm48q03bn',
							label: {
								type: 'VTL|MD',
								value:
									'"The iteration for the next loop will be filtered if name is not Paul"',
							},
							position: 'AFTER_QUESTION_TEXT',
							declarationType: 'HELP',
						},
					],
					componentType: 'Question',
					conditionFilter: {
						type: 'VTL',
						value: 'true',
					},
				},
			],
		};
		expect(getIterationsProp(components, defaultMockState)).toBeDefined();
		expect(getIterationsProp(components, defaultMockState)).toBe(3);
	});

	it('return undefined if the component is not a Loop', () => {
		const components: LunaticComponentDefinition = {
			id: 'question-m48ph1pw',
			page: '3',
			label: {
				type: 'VTL|MD',
				value: '"name"',
			},
			components: [
				{
					id: 'm48ph1pw',
					page: '3',
					response: {
						name: 'NAME',
					},
					maxLength: 249,
					isMandatory: false,
					componentType: 'Input',
				},
			],
			declarations: [
				{
					id: 'm48q03bn',
					label: {
						type: 'VTL|MD',
						value:
							'"The iteration for the next loop will be filtered if name is not Paul"',
					},
					position: 'AFTER_QUESTION_TEXT',
					declarationType: 'HELP',
				},
			],
			componentType: 'Question',
			conditionFilter: {
				type: 'VTL',
				value: 'true',
			},
		};
		expect(getIterationsProp(components, defaultMockState)).toBeUndefined();
	});

});

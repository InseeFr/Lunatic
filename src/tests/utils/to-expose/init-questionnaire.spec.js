import * as I from 'utils/to-expose/init-questionnaire';

describe('init-questionnaire', () => {
	describe('mergeQuestionnaireAndData', () => {
		it('should return empty object', () => {
			expect(I.mergeQuestionnaireAndData()()).toEqual({});
			expect(I.mergeQuestionnaireAndData({})({})).toEqual({});
			expect(I.mergeQuestionnaireAndData({ components: [] })({})).toEqual({});
		});
		it('should return filled questionnaire', () => {
			expect(I.mergeQuestionnaireAndData(questionnaire)(data)).toEqual(result);
		});
	});
});

const questionnaire = {
	components: [
		{
			componentType: 'Input',
			response: {
				name: 'input',
				valueState: [{ valueType: 'COLLECTED', value: null }],
			},
		},
		{
			componentType: 'CheckboxGroup',
			responses: [
				{
					response: {
						name: 'check1',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					response: {
						name: 'check2',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
			],
		},
		{
			componentType: 'Table',
			cells: [
				[
					{
						componentType: 'Radio',
						response: {
							name: 'table11',
							valueState: [{ valueType: 'COLLECTED', value: null }],
						},
					},
				],
			],
		},
	],
};

const data = {
	input: { COLLECTED: 'My input' },
	check1: { COLLECTED: true },
	check2: { COLLECTED: false, FORCED: true },
	table11: { COLLECTED: '1' },
};

const result = {
	components: [
		{
			componentType: 'Input',
			response: {
				name: 'input',
				valueState: [{ valueType: 'COLLECTED', value: 'My input' }],
			},
		},
		{
			componentType: 'CheckboxGroup',
			responses: [
				{
					response: {
						name: 'check1',
						valueState: [
							{ valueType: 'COLLECTED', value: true },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					response: {
						name: 'check2',
						valueState: [
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: true },
						],
					},
				},
			],
		},
		{
			componentType: 'Table',
			cells: [
				[
					{
						componentType: 'Radio',
						response: {
							name: 'table11',
							valueState: [{ valueType: 'COLLECTED', value: '1' }],
						},
					},
				],
			],
		},
	],
};

import * as H from 'utils/to-expose/handler';

describe('handler', () => {
	describe('updateQuestionnaire', () => {
		it('should return empty object', () => {
			expect(H.updateQuestionnaire('')({})([])()).toEqual({});
		});
		it('should return empty initial questionnaire', () => {
			expect(H.updateQuestionnaire('')(questionnaire)([])()).toEqual(
				questionnaire
			);
			expect(
				H.updateQuestionnaire('EDITED')(questionnaire)(['COLLECTED', 'EDITED'])(
					{
						input: 'My input',
					}
				)
			).toEqual(questionnaire);
			expect(
				H.updateQuestionnaire('FORCED')(questionnaire)(['COLLECTED', 'FORCED'])(
					{
						check2: true,
					}
				)
			).toEqual(questionnaire);
		});
		it('should return simple updated questionnaire', () => {
			expect(
				H.updateQuestionnaire('EDITED')(questionnaire)(['COLLECTED', 'EDITED'])(
					{
						input: 'My new input',
					}
				)
			).toEqual(simpleUpdatedQuestionnaire);
		});
		it('should return vectorial updated questionnaire', () => {
			expect(
				H.updateQuestionnaire('FORCED')(questionnaire)(['COLLECTED', 'FORCED'])(
					{
						check2: false,
					}
				)
			).toEqual(vectorialUpdatedQuestionnaire);
		});
		it('should return matrix updated questionnaire', () => {
			expect(
				H.updateQuestionnaire('COLLECTED')(questionnaire)(['COLLECTED'])({
					table11: 'My new input',
				})
			).toEqual(matrixUpdatedQuestionnaire);
		});
	});
});

const inputResponse = {
	name: 'input',
	valueState: [
		{ valueType: 'COLLECTED', value: 'My input' },
		{ valueType: 'EDITED', value: null },
	],
};
const inputComponent = {
	componentType: 'Input',
	response: inputResponse,
};

const checkboxGroupResponses = [
	{
		componentType: 'CheckboxBoolean',
		response: {
			name: 'check1',
			valueState: [
				{ valueType: 'COLLECTED', value: null },
				{ valueType: 'FORCED', value: null },
			],
		},
	},
	{
		componentType: 'CheckboxBoolean',
		response: {
			name: 'check2',
			valueState: [
				{ valueType: 'COLLECTED', value: true },
				{ valueType: 'FORCED', value: null },
			],
		},
	},
];
const checkboxGroupComponent = {
	componentType: 'CheckboxGroup',
	responses: checkboxGroupResponses,
};

const matrixCells = [
	[
		{
			componentType: 'Input',
			response: {
				name: 'table11',
				valueState: [{ valueType: 'COLLECTED', value: 'My input' }],
			},
		},
	],
];
const matrixGroupComponent = {
	componentType: 'Table',
	cells: matrixCells,
};

const simpleUpdatedQuestionnaire = {
	components: [
		{
			componentType: 'Input',
			response: {
				name: 'input',
				valueState: [
					{ valueType: 'COLLECTED', value: 'My input' },
					{ valueType: 'EDITED', value: 'My new input' },
				],
			},
		},
		checkboxGroupComponent,
		matrixGroupComponent,
	],
};

const vectorialUpdatedQuestionnaire = {
	components: [
		inputComponent,
		{
			componentType: 'CheckboxGroup',
			responses: [
				{
					componentType: 'CheckboxBoolean',
					response: {
						name: 'check1',
						valueState: [
							{ valueType: 'COLLECTED', value: null },
							{ valueType: 'FORCED', value: null },
						],
					},
				},
				{
					componentType: 'CheckboxBoolean',
					response: {
						name: 'check2',
						valueState: [
							{ valueType: 'COLLECTED', value: true },
							{ valueType: 'FORCED', value: false },
						],
					},
				},
			],
		},
		matrixGroupComponent,
	],
};

const matrixUpdatedQuestionnaire = {
	components: [
		inputComponent,
		checkboxGroupComponent,
		{
			componentType: 'Table',
			cells: [
				[
					{
						componentType: 'Input',
						response: {
							name: 'table11',
							valueState: [{ valueType: 'COLLECTED', value: 'My new input' }],
						},
					},
				],
			],
		},
	],
};

const components = [
	inputComponent,
	checkboxGroupComponent,
	matrixGroupComponent,
];

const questionnaire = {
	components,
};

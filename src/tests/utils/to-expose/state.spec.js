import {
	getState,
	getCollectedState,
	getCollectedStateByValueType,
} from 'utils/to-expose';

describe('init-state', () => {
	describe('getState', () => {
		it('should return empty object', () => {
			expect(getState([])).toEqual({
				COLLECTED: {},
				CALCULATED: {},
				EXTERNAL: {},
			});
		});
		it('should return object', () => {
			expect(getState(questionnaire)).toEqual(state);
		});
	});
	describe('getCollectedState', () => {
		it('should return empty object', () => {
			expect(getCollectedState([])).toEqual({});
		});
		it('should return object', () => {
			expect(getCollectedState(questionnaire)).toEqual(collectedState);
		});
	});
	describe('getCollectedStateByValueType', () => {
		it('should return empty object', () => {
			expect(getCollectedStateByValueType([])('')).toEqual({});
			expect(getCollectedStateByValueType(questionnaire)('')).toEqual({});
		});
		it('should return object', () => {
			expect(getCollectedStateByValueType(questionnaire)('COLLECTED')).toEqual(
				collectedStateCollected
			);
		});
	});
});

const questionnaire = {
	components: [
		{
			componentType: 'Sequence',
		},
		{
			componentType: 'Textarea',
			response: {
				name: 'COMMENT',
				valueState: [
					{ valueType: 'PREVIOUS', value: 'PREVIOUS' },
					{ valueType: 'COLLECTED', value: 'COLLECTED' },
					{ valueType: 'FORCED', value: 'FORCED' },
					{ valueType: 'EDITED', value: 'EDITED' },
					{ valueType: 'INPUTED', value: 'INPUTED' },
				],
			},
		},
		{
			componentType: 'CheckboxGroup',
			responses: [
				{
					response: {
						name: 'PET1',
						valueState: [
							{ valueType: 'PREVIOUS', value: false },
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: false },
							{ valueType: 'EDITED', value: false },
							{ valueType: 'INPUTED', value: false },
						],
					},
				},
				{
					response: {
						name: 'PET2',
						valueState: [
							{ valueType: 'PREVIOUS', value: false },
							{ valueType: 'COLLECTED', value: false },
							{ valueType: 'FORCED', value: false },
							{ valueType: 'EDITED', value: false },
							{ valueType: 'INPUTED', value: false },
						],
					},
				},
			],
		},
		{
			componentType: 'Table',
			cells: [
				[
					{ value: '1', label: 'Vanilla' },
					{
						componentType: 'Radio',
						response: {
							name: 'ICE_FLAVOUR1',
							valueState: [
								{ valueType: 'PREVIOUS', value: '' },
								{ valueType: 'COLLECTED', value: '' },
								{ valueType: 'FORCED', value: '' },
								{ valueType: 'EDITED', value: '' },
								{ valueType: 'INPUTED', value: '' },
							],
						},
					},
				],
				[
					{ value: '2', label: 'Other' },
					{
						componentType: 'CheckboxGroup',
						responses: [
							{
								response: {
									name: 'ICE_FLAVOUR21',
									valueState: [
										{ valueType: 'PREVIOUS', value: null },
										{ valueType: 'COLLECTED', value: null },
										{ valueType: 'FORCED', value: null },
										{ valueType: 'EDITED', value: null },
										{ valueType: 'INPUTED', value: null },
									],
								},
							},
							{
								response: {
									name: 'ICE_FLAVOUR22',
									valueState: [
										{ valueType: 'PREVIOUS', value: true },
										{ valueType: 'COLLECTED', value: true },
										{ valueType: 'FORCED', value: true },
										{ valueType: 'EDITED', value: true },
										{ valueType: 'INPUTED', value: true },
									],
								},
							},
						],
					},
				],
			],
		},
	],
	variables: [
		{ variableType: 'EXTERNAL', name: 'EXT', label: 'EXT value' },
		{
			variableType: 'CALCULATED',
			name: 'CALC',
			value: 'XXX',
		},
	],
};
const state = {
	COLLECTED: {
		COMMENT: {
			PREVIOUS: 'PREVIOUS',
			COLLECTED: 'COLLECTED',
			FORCED: 'FORCED',
			EDITED: 'EDITED',
			INPUTED: 'INPUTED',
		},
		PET1: {
			PREVIOUS: false,
			COLLECTED: false,
			FORCED: false,
			EDITED: false,
			INPUTED: false,
		},
		PET2: {
			PREVIOUS: false,
			COLLECTED: false,
			FORCED: false,
			EDITED: false,
			INPUTED: false,
		},
		ICE_FLAVOUR1: {
			PREVIOUS: '',
			COLLECTED: '',
			FORCED: '',
			EDITED: '',
			INPUTED: '',
		},
		ICE_FLAVOUR21: {
			PREVIOUS: null,
			COLLECTED: null,
			FORCED: null,
			EDITED: null,
			INPUTED: null,
		},
		ICE_FLAVOUR22: {
			PREVIOUS: true,
			COLLECTED: true,
			FORCED: true,
			EDITED: true,
			INPUTED: true,
		},
	},
	EXTERNAL: { EXT: 'EXT value' },
	CALCULATED: { CALC: 'Evaluation is coming soon!' },
};

const collectedState = {
	COMMENT: {
		PREVIOUS: 'PREVIOUS',
		COLLECTED: 'COLLECTED',
		FORCED: 'FORCED',
		EDITED: 'EDITED',
		INPUTED: 'INPUTED',
	},
	PET1: {
		PREVIOUS: false,
		COLLECTED: false,
		FORCED: false,
		EDITED: false,
		INPUTED: false,
	},
	PET2: {
		PREVIOUS: false,
		COLLECTED: false,
		FORCED: false,
		EDITED: false,
		INPUTED: false,
	},
	ICE_FLAVOUR1: {
		PREVIOUS: '',
		COLLECTED: '',
		FORCED: '',
		EDITED: '',
		INPUTED: '',
	},
	ICE_FLAVOUR21: {
		PREVIOUS: null,
		COLLECTED: null,
		FORCED: null,
		EDITED: null,
		INPUTED: null,
	},
	ICE_FLAVOUR22: {
		PREVIOUS: true,
		COLLECTED: true,
		FORCED: true,
		EDITED: true,
		INPUTED: true,
	},
};

const collectedStateCollected = {
	COMMENT: 'COLLECTED',
	PET1: false,
	PET2: false,
	ICE_FLAVOUR1: '',
	ICE_FLAVOUR22: true,
};

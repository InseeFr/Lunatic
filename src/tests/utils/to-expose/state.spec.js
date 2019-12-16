import {
	getState,
	getCollectedState,
	getCollectedStateByValueType,
	getBindings,
	getLabelBindings,
} from 'utils/to-expose/state';

describe('state', () => {
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
			expect(
				getCollectedStateByValueType(questionnaire)('COLLECTED', true)
			).toEqual(collectedStateCollectedWithNull);
		});
	});
	describe('getBindings', () => {
		it('should return empty object', () => {
			expect(getBindings([])).toEqual({});
		});
		it('should return object', () => {
			expect(getBindings(questionnaire)).toEqual(bindingsResults);
		});
	});
	describe('getLabelBindings', () => {
		it('should return empty object', () => {
			expect(getLabelBindings([])).toEqual({});
		});
		it('should return object', () => {
			expect(getLabelBindings(questionnaire)).toEqual(labelBindingsResults);
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
			id: 'j3343clt',
			componentType: 'Radio',
			mandatory: false,
			label: '➡ 1. In which city do the Simpsons reside?',
			response: {
				name: 'CITY',
				valueState: [
					{ valueType: 'PREVIOUS', value: null },
					{ valueType: 'COLLECTED', value: '00002' },
					{ valueType: 'FORCED', value: '00001' },
					{ valueType: 'EDITED', value: null },
					{ valueType: 'INPUTED', value: null },
				],
			},
			options: [
				{ value: '00001', label: 'Springfield' },
				{ value: '00002', label: 'Shelbyville' },
				{ value: '00003', label: 'Seinfeld' },
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
	variables: {
		EXTERNAL: { EXT: 'EXT value' },
		CALCULATED: {
			CALC: {
				expression: 'expression',
				value: 'XXX',
			},
		},
	},
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
		CITY: {
			PREVIOUS: null,
			COLLECTED: '00002',
			FORCED: '00001',
			EDITED: null,
			INPUTED: null,
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
	CALCULATED: { CALC: 'XXX' },
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
	CITY: {
		PREVIOUS: null,
		COLLECTED: '00002',
		FORCED: '00001',
		EDITED: null,
		INPUTED: null,
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
	CITY: '00002',
	ICE_FLAVOUR1: '',
	ICE_FLAVOUR22: true,
};

const collectedStateCollectedWithNull = {
	COMMENT: 'COLLECTED',
	PET1: false,
	PET2: false,
	CITY: '00002',
	ICE_FLAVOUR1: '',
	ICE_FLAVOUR21: null,
	ICE_FLAVOUR22: true,
};

const bindingsResults = {
	COMMENT: 'COLLECTED',
	PET1: false,
	PET2: false,
	ICE_FLAVOUR1: '',
	ICE_FLAVOUR21: null,
	ICE_FLAVOUR22: true,
	CITY: '00002',
	EXT: 'EXT value',
	CALC: 'XXX',
};
const labelBindingsResults = {
	COMMENT: 'COLLECTED',
	PET1: 'Faux',
	PET2: 'Faux',
	ICE_FLAVOUR1: '',
	ICE_FLAVOUR21: null,
	ICE_FLAVOUR22: 'Vrai',
	CITY: 'Shelbyville',
	EXT: 'EXT value',
	CALC: 'XXX',
};

import { getState } from 'utils/to-expose';

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
			componentType: 'Checkbox',
			options: [
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
						componentType: 'Checkbox',
						options: [
							{
								response: {
									name: 'ICE_FLAVOUR21',
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
	variables: [],
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
			PREVIOUS: false,
			COLLECTED: false,
			FORCED: false,
			EDITED: false,
			INPUTED: false,
		},
		ICE_FLAVOUR22: {
			PREVIOUS: true,
			COLLECTED: true,
			FORCED: true,
			EDITED: true,
			INPUTED: true,
		},
	},
	CALCULATED: {},
	EXTERNAL: {},
};

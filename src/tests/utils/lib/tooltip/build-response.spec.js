import {
	buildMultiTooltipResponse,
	buildBooleanTooltipResponse,
} from 'utils/lib';

const options = [
	{ value: '1', label: 'Yes' },
	{ value: '0', label: 'No' },
];

const responseNull = {
	name: 'Response',
	valueState: [
		{ valueType: 'PREVIOUS', value: null },
		{ valueType: 'COLLECTED', value: null },
		{ valueType: 'FORCED', value: null },
		{ valueType: 'EDITED', value: null },
		{ valueType: 'INPUTED', value: null },
	],
};

const response = {
	name: 'Response',
	valueState: [
		{ valueType: 'PREVIOUS', value: null },
		{ valueType: 'COLLECTED', value: '1' },
		{ valueType: 'FORCED', value: '0' },
		{ valueType: 'EDITED', value: '1' },
		{ valueType: 'INPUTED', value: null },
	],
};

const finalResponse = {
	name: 'Response',
	valueState: [
		{ valueType: 'PREVIOUS', value: null },
		{ valueType: 'COLLECTED', value: 'Yes' },
		{ valueType: 'FORCED', value: 'No' },
		{ valueType: 'EDITED', value: 'Yes' },
		{ valueType: 'INPUTED', value: null },
	],
};

const booleanResponse = {
	name: 'Response',
	valueState: [
		{ valueType: 'PREVIOUS', value: null },
		{ valueType: 'COLLECTED', value: true },
		{ valueType: 'FORCED', value: false },
		{ valueType: 'EDITED', value: true },
		{ valueType: 'INPUTED', value: null },
	],
};

const booleanFinalResponse = {
	name: 'Response',
	valueState: [
		{ valueType: 'PREVIOUS', value: null },
		{ valueType: 'COLLECTED', value: 'Vrai' },
		{ valueType: 'FORCED', value: 'Faux' },
		{ valueType: 'EDITED', value: 'Vrai' },
		{ valueType: 'INPUTED', value: null },
	],
};

describe('build response', () => {
	describe('buildMultiTooltipResponse', () => {
		it('should return default value', () => {
			expect(buildMultiTooltipResponse()()).toEqual({});
		});
		it('should return same response', () => {
			expect(buildMultiTooltipResponse(options)(responseNull)).toEqual(
				responseNull
			);
		});
		it('should return updated response', () => {
			expect(buildMultiTooltipResponse(options)(response)).toEqual(
				finalResponse
			);
		});
	});
	describe('buildBooleanTooltipResponse', () => {
		it('should return default value', () => {
			expect(buildBooleanTooltipResponse()).toEqual({});
		});
		it('should return same response', () => {
			expect(buildBooleanTooltipResponse(responseNull)).toEqual(responseNull);
		});
		it('should return updated response', () => {
			expect(buildBooleanTooltipResponse(booleanResponse)).toEqual(
				booleanFinalResponse
			);
		});
	});
});

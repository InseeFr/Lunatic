import { buildMultiTooltipResponse } from 'utils/lib';

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
});

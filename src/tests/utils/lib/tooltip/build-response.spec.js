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
	values: {
		PREVIOUS: null,
		COLLECTED: null,
		FORCED: null,
		EDITED: null,
		INPUTED: null,
	},
};

const response = {
	name: 'Response',
	values: {
		PREVIOUS: null,
		COLLECTED: '1',
		FORCED: '0',
		EDITED: '1',
		INPUTED: null,
	},
};

const finalResponse = {
	name: 'Response',
	values: {
		PREVIOUS: null,
		COLLECTED: 'Yes',
		FORCED: 'No',
		EDITED: 'Yes',
		INPUTED: null,
	},
};

const booleanResponse = {
	name: 'Response',
	values: {
		PREVIOUS: null,
		COLLECTED: true,
		FORCED: false,
		EDITED: true,
		INPUTED: null,
	},
};

const booleanFinalResponse = {
	name: 'Response',
	values: {
		PREVIOUS: null,
		COLLECTED: 'Vrai',
		FORCED: 'Faux',
		EDITED: 'Vrai',
		INPUTED: null,
	},
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

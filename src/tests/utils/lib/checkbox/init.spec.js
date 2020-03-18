import { initCheckboxResponse } from 'utils/lib';

describe('checkbox-init', () => {
	describe('initCheckboxResponse', () => {
		it('return empty response', () => {
			expect(initCheckboxResponse()).toEqual({});
			expect(initCheckboxResponse({})).toEqual({});
		});
		it('return unmodified response', () => {
			const response = {
				name: 'name',
				valueState: [{ valueType: 'COLLECTED', value: true }],
			};
			expect(initCheckboxResponse(response)).toEqual(response);
		});
		it('return modified response', () => {
			const response = {
				name: 'name',
				valueState: [
					{ valueType: 'COLLECTED', value: null },
					{ valueType: 'FORCED', value: null },
				],
			};
			const result = {
				name: 'name',
				valueState: [
					{ valueType: 'COLLECTED', value: false },
					{ valueType: 'FORCED', value: null },
				],
			};
			expect(initCheckboxResponse(response)).toEqual(result);
		});
	});
});

import * as R from 'utils/responses';

describe('responses utils', () => {
	describe('getResponseName', () => {
		it('should return default value', () => {
			expect(R.getResponseName({})).toEqual('');
		});
	});
	describe('getResponseByType', () => {
		it('should return default value', () => {
			expect(R.getResponseByType('')({})).toEqual('');
		});
	});
});

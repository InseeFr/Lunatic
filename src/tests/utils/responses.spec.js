import * as R from 'utils/responses';

describe('responses utils', () => {
	describe('getResponseName', () => {
		it('should return default value', () => {
			expect(R.getResponseName({})).toEqual('');
		});
	});
	describe('getResponseByPreference', () => {
		it('should return default value', () => {
			expect(R.getResponseByPreference([])({})).toEqual('');
		});
		it('should return Collected', () => {
			expect(
				R.getResponseByPreference(['COLLECTED'])({
					name: 'name',
					valueState: [{ valueType: 'COLLECTED', value: 'Collected' }],
				})
			).toEqual('Collected');
		});
		it('should return Collected', () => {
			expect(
				R.getResponseByPreference(['COLLECTED'])({
					name: 'name',
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: 'Forced' },
					],
				})
			).toEqual('Collected');
		});
		it('should return Forced', () => {
			expect(
				R.getResponseByPreference(['COLLECTED', 'FORCED'])({
					name: 'name',
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: 'Forced' },
					],
				})
			).toEqual('Forced');
		});
	});
});

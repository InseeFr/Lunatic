import * as R from 'utils/lib/responses';

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
		it('should return Collected', () => {
			expect(
				R.getResponseByPreference(['COLLECTED', 'FORCED'])({
					name: 'name',
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: null },
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

		it('should return ""', () => {
			expect(
				R.getResponseByPreference(['COLLECTED', 'FORCED', 'EDITED'])({
					name: 'name',
					valueState: [
						{ valueType: 'COLLECTED', value: 'Collected' },
						{ valueType: 'FORCED', value: '' },
						{ valueType: 'EDITED', value: null },
					],
				})
			).toEqual('');
		});
	});
});

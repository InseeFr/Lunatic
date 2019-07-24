import {
	getResponseName,
	getResponseByPreference,
} from '../../utils/lib/responses';

describe('responses utils', () => {
	describe('getResponseName', () => {
		it('should return default value', () => {
			expect(getResponseName({})).toEqual('');
		});
	});
	describe('getResponseByPreference', () => {
		it('should return default value', () => {
			expect(getResponseByPreference([])({})).toEqual('');
		});
		it('should return Collected', () => {
			expect(
				getResponseByPreference(['COLLECTED'])({
					name: 'name',
					valueState: [{ valueType: 'COLLECTED', value: 'Collected' }],
				})
			).toEqual('Collected');
		});
		it('should return Collected', () => {
			expect(
				getResponseByPreference(['COLLECTED'])({
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
				getResponseByPreference(['COLLECTED', 'FORCED'])({
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
				getResponseByPreference(['COLLECTED', 'FORCED'])({
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
				getResponseByPreference(['COLLECTED', 'FORCED', 'EDITED'])({
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

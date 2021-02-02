import * as R from 'utils/lib/responses';

describe('responses utils', () => {
	describe('getResponseName', () => {
		it('should return default value', () => {
			expect(R.getResponseName({})).toEqual('');
		});
	});
	describe('getResponseByPreference', () => {
		it('should return default value', () => {
			expect(R.getResponseByPreference([])({})).toEqual(null);
			expect(
				R.getResponseByPreference([])({
					name: 'name',
					values: { COLLECTED: 'Collected' },
				})
			).toEqual(null);
		});
		it('should return Collected', () => {
			expect(
				R.getResponseByPreference(['COLLECTED'])({
					name: 'name',
					values: { COLLECTED: 'Collected' },
				})
			).toEqual('Collected');
		});
		it('should return Collected', () => {
			expect(
				R.getResponseByPreference(['COLLECTED'])({
					name: 'name',
					values: { COLLECTED: 'Collected', FORCED: 'Forced' },
				})
			).toEqual('Collected');
		});
		it('should return Collected', () => {
			expect(
				R.getResponseByPreference(['COLLECTED', 'FORCED'])({
					name: 'name',
					values: {
						COLLECTED: 'Collected',
						FORCED: null,
					},
				})
			).toEqual('Collected');
		});
		it('should return Forced', () => {
			expect(
				R.getResponseByPreference(['COLLECTED', 'FORCED'])({
					name: 'name',
					values: { COLLECTED: 'Collected', FORCED: 'Forced' },
				})
			).toEqual('Forced');
		});

		it('should return ""', () => {
			expect(
				R.getResponseByPreference(['COLLECTED', 'FORCED', 'EDITED'])({
					name: 'name',
					values: { COLLECTED: 'Collected', FORCED: '', EDITED: null },
				})
			).toEqual('');
		});
	});
});

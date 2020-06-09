import { responseToClean } from 'utils/lib';

describe('checkbox utils', () => {
	describe('responseToClean', () => {
		it('should return default value', () => {
			expect(responseToClean()()()).toBeFalsy();
			expect(responseToClean([])(['COLLECTED'])('')).toBeFalsy();
			expect(
				responseToClean([
					{ response: { name: 'key', values: { COLLECTED: true } } },
				])()('key')
			).toBeFalsy();
			expect(
				responseToClean([
					{ response: { name: 'key', values: { COLLECTED: true } } },
				])(['COLLECTED'])()
			).toBeFalsy();
		});
		it('should return true', () => {
			expect(
				responseToClean([
					{
						response: {
							name: 'key',
							values: { COLLECTED: null, EDITED: true },
						},
					},
				])(['COLLECTED', 'EDITED'])('key')
			).toBeTruthy();
		});
		it('should return false', () => {
			expect(
				responseToClean([
					{
						response: {
							name: 'key',
							values: { COLLECTED: true, EDITED: false },
						},
					},
				])(['COLLECTED', 'EDITED'])('key')
			).toBeFalsy();
		});
	});
});

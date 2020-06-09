import { responseToClean, responsesToClean } from 'utils/lib';

describe('checkbox utils', () => {
	describe('responseToClean', () => {
		it('should return default value', () => {
			expect(responseToClean()()).toBeFalsy();
			expect(responseToClean({})(['COLLECTED'])).toBeFalsy();
			expect(
				responseToClean({
					name: 'key',
					values: { COLLECTED: true, EDITED: false },
				})()
			).toBeFalsy();
		});
		it('should return true', () => {
			expect(
				responseToClean({
					name: 'key',
					values: { COLLECTED: null, EDITED: true },
				})(['COLLECTED', 'EDITED'])
			).toBeTruthy();
		});
		it('should return false', () => {
			expect(
				responseToClean({
					name: 'key',
					values: { COLLECTED: true, EDITED: false },
				})(['COLLECTED', 'EDITED'])
			).toBeFalsy();
		});
	});
	describe('responsesToClean', () => {
		it('should return default value', () => {
			expect(responsesToClean()()()).toBeFalsy();
			expect(responsesToClean([])(['COLLECTED'])('')).toBeFalsy();
			expect(
				responsesToClean([
					{ response: { name: 'key', values: { COLLECTED: true } } },
				])()('key')
			).toBeFalsy();
			expect(
				responsesToClean([
					{ response: { name: 'key', values: { COLLECTED: true } } },
				])(['COLLECTED'])()
			).toBeFalsy();
		});
		it('should return true', () => {
			expect(
				responsesToClean([
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
				responsesToClean([
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

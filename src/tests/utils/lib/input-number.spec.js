import { isNumberValid } from 'utils/lib';

describe('input number utils', () => {
	describe('isNumberValid', () => {
		it('should return default false', () => {
			expect(isNumberValid('')).toBeFalsy();
			expect(isNumberValid('r')).toBeFalsy();
			expect(isNumberValid('1.')).toBeFalsy();
			expect(isNumberValid('1.0')).toBeFalsy();
			expect(isNumberValid('1.222')).toBeFalsy();
			expect(isNumberValid('1.222', 2)).toBeFalsy();
		});
		it('should return true', () => {
			expect(isNumberValid('5')).toBeTruthy();
			expect(isNumberValid('1.222', 3)).toBeTruthy();
		});
	});
});

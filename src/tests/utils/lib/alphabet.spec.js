import { getAlphabet } from 'utils/lib';

describe('alphabet', () => {
	describe('getAlphabet', () => {
		it('should return array of letters', () => {
			expect(getAlphabet()).toEqual([
				'a',
				'b',
				'c',
				'd',
				'e',
				'f',
				'g',
				'h',
				'i',
				'j',
				'k',
				'l',
				'm',
				'n',
				'o',
				'p',
				'q',
				'r',
				's',
				't',
				'u',
				'v',
				'w',
				'x',
				'y',
				'z',
			]);
		});
	});
});

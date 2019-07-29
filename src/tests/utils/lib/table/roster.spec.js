import { getRosterInitLines } from 'utils/lib';

const emptyCells = [[{ response: { valueState: [{ value: null }] } }]];
const cells = [
	[
		{ response: { valueState: [{ value: 'ok' }] } },
		{ response: { valueState: [{ value: 'ok2' }] } },
	],
	[{ response: { valueState: [{ value: 'ok' }] } }],
	[],
	[{ response: { valueState: [{ value: null }] } }],
	[{ response: { valueState: [{ value: 'ok' }] } }],
];

describe('roster utils', () => {
	describe('getRosterInitLines', () => {
		it('should return 0', () => {
			expect(getRosterInitLines()).toEqual(0);
			expect(getRosterInitLines(emptyCells)).toEqual(0);
		});
		it('should return 2', () => {
			expect(getRosterInitLines(cells)).toEqual(3);
		});
	});
});

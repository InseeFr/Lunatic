import { getRosterInitLines } from 'utils/lib';

const emptyCells = [[{ response: { values: { '': null } } }]];
const cells = [
	[
		{ response: { values: { '': 'ok' } } },
		{ response: { values: { '': 'ok2' } } },
	],
	[{ response: { values: { '': 'ok' } } }],
	[],
	[{ response: { values: { '': null } } }],
	[{ response: { values: { '1': 'ok', '2': 'ok2' } } }],
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

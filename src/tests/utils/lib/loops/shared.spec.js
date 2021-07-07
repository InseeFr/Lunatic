import * as U from 'utils/lib';

const componentsForInit = [
	{
		id: '1',
		response: { name: 'a', values: { COLLECTED: [null, 'a'] } },
		missingResponse: { name: 'z', depth: 0 },
		depth: 0,
	},
	{
		id: '2',
		response: { name: 'b', values: { COLLECTED: [null, 'b'] } },
		depth: 0,
	},
	{
		id: '3',
		responses: [
			{
				id: '3.1',
				depth: 1,
				response: { name: 'c', values: { COLLECTED: [null, null] } },
				missingResponse: { name: 'zz', depth: 1 },
			},
		],
	},
];

describe('loop roster utils', () => {
	describe('getLoopConstructorInitLines', () => {
		it('should return default value', () => {
			expect(U.getLoopConstructorInitLines()).toEqual(0);
			expect(U.getLoopConstructorInitLines([])).toEqual(0);
		});
		it('should return roster init line length', () => {
			expect(U.getLoopConstructorInitLines(componentsForInit)).toEqual(2);
		});
	});
	describe('getInvolvedVariables', () => {
		it('should return default value', () => {
			expect(U.getInvolvedVariables()).toEqual([]);
			expect(U.getInvolvedVariables([])).toEqual([]);
		});
		it('should return variables involved into roster for loop', () => {
			expect(U.getInvolvedVariables(componentsForInit)).toEqual([
				{ name: 'a', depth: 0 },
				{ name: 'z', depth: 0 },
				{ name: 'b', depth: 0 },
				{ name: 'c', depth: 1 },
				{ name: 'zz', depth: 1 },
			]);
		});
	});
	describe('lastLoopChildLineIsEmpty', () => {
		it('should return default value', () => {
			expect(U.lastLoopChildLineIsEmpty()()).toBeTruthy();
			expect(U.lastLoopChildLineIsEmpty({})([])).toBeTruthy();
		});
		it('should return last line is not empty', () => {
			const d = { A: [null, 'a'], B: ['b', null] };
			const iv = [{ name: 'A' }, { name: 'B' }];
			expect(U.lastLoopChildLineIsEmpty(d)(iv)).toBeFalsy();
		});
		it('should return last line is empty', () => {
			const d = { A: [null, null], B: ['b', null] };
			const iv = [{ name: 'A' }, { name: 'B' }];
			expect(U.lastLoopChildLineIsEmpty(d)(iv)).toBeTruthy();
		});
	});

	describe('buildEmptyValue', () => {
		it('should return default value', () => {
			expect(U.buildEmptyValue()).toBeNull();
			expect(U.buildEmptyValue(0)).toBeNull();
			expect(U.buildEmptyValue(1)).toBeNull();
			expect(U.buildEmptyValue(2)).toBeNull();
		});
		it('should return null array thanks to depth', () => {
			expect(U.buildEmptyValue(3)).toEqual([null]);
			expect(U.buildEmptyValue(4)).toEqual([[null]]);
		});
	});
});

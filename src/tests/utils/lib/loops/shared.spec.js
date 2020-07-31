import {
	getRosterForLoopInitLines,
	getInvolvedVariables,
	lastRosterForLoopLineIsEmpty,
	buildEmptyValue,
} from 'utils/lib';

const componentsForInit = [
	{
		id: '1',
		response: { name: 'a', values: { COLLECTED: [null, 'a'] } },
		depth: 0,
	},
	{
		id: '2',
		response: { name: 'b', values: { COLLECTED: [null, 'b'] } },
		depth: 0,
	},
	{
		id: '3',
		response: { name: 'c', values: { COLLECTED: [null, null] } },
		depth: 0,
	},
];

describe('loop roster utils', () => {
	describe('getRosterForLoopInitLines', () => {
		it('should return default value', () => {
			expect(getRosterForLoopInitLines()).toEqual(0);
			expect(getRosterForLoopInitLines([])).toEqual(0);
		});
		it('should return roster init line length', () => {
			expect(getRosterForLoopInitLines(componentsForInit)).toEqual(2);
		});
	});
	describe('getInvolvedVariables', () => {
		it('should return default value', () => {
			expect(getInvolvedVariables()).toEqual([]);
			expect(getInvolvedVariables([])).toEqual([]);
		});
		it('should return variables involved into roster for loop', () => {
			expect(getInvolvedVariables(componentsForInit)).toEqual([
				{ name: 'a', depth: 0 },
				{ name: 'b', depth: 0 },
				{ name: 'c', depth: 0 },
			]);
		});
	});
	describe('lastRosterForLoopLineIsEmpty', () => {
		it('should return default value', () => {
			expect(lastRosterForLoopLineIsEmpty()()).toBeTruthy();
			expect(lastRosterForLoopLineIsEmpty({})([])).toBeTruthy();
		});
		it('should return last line is not empty', () => {
			const d = { A: [null, 'a'], B: ['b', null] };
			const iv = [{ name: 'A' }, { name: 'B' }];
			expect(lastRosterForLoopLineIsEmpty(d)(iv)).toBeFalsy();
		});
		it('should return last line is empty', () => {
			const d = { A: [null, null], B: ['b', null] };
			const iv = [{ name: 'A' }, { name: 'B' }];
			expect(lastRosterForLoopLineIsEmpty(d)(iv)).toBeTruthy();
		});
	});

	describe('buildEmptyValue', () => {
		it('should return default value', () => {
			expect(buildEmptyValue()).toBeNull();
			expect(buildEmptyValue(0)).toBeNull();
		});
		it('should return null array thanks to depth', () => {
			expect(buildEmptyValue(1)).toEqual([null]);
			expect(buildEmptyValue(2)).toEqual([[null]]);
			expect(buildEmptyValue(3)).toEqual([[[null]]]);
		});
	});
});

import {
	getRosterForLoopInitLines,
	getInvolvedVariables,
	lastRosterForLoopLineIsEmpty,
} from 'utils/lib';

const componentsForInit = [
	{ id: '1', response: { name: 'a', values: { COLLECTED: [null, 'a'] } } },
	{ id: '2', response: { name: 'b', values: { COLLECTED: [null, 'b'] } } },
	{ id: '3', response: { name: 'c', values: { COLLECTED: [null, null] } } },
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
			expect(getInvolvedVariables(componentsForInit)).toEqual(['a', 'b', 'c']);
		});
	});
	describe('lastRosterForLoopLineIsEmpty', () => {
		it('should return default value', () => {
			expect(lastRosterForLoopLineIsEmpty()).toBeTruthy();
			expect(lastRosterForLoopLineIsEmpty([])).toBeTruthy();
		});
		it('should return last line is not empty', () => {
			const d = { A: [null, 'a'], B: ['b', null] };
			expect(lastRosterForLoopLineIsEmpty(d)).toBeFalsy();
		});
		it('should return last line is empty', () => {
			const d = { A: [null, null], B: ['b', null] };
			expect(lastRosterForLoopLineIsEmpty(d)).toBeTruthy();
		});
	});
});

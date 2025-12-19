import { describe, it, expect } from 'vitest';
import { applyMelauto, melautoScore } from './melauto';

// Mock data to test the sorting and scoring
const data = [
	{ id: '1', label: 'Hello world' },
	{ id: '2', label: 'Bonjour le monde' },
	{ id: '3', label: 'Hello everyone' },
	{ id: '4', label: 'Greetings planet' },
];

describe('applyMelauto', () => {
	it('should return data in original order if query is empty', () => {
		const sortedData = applyMelauto('', data);
		expect(sortedData).toEqual(data);
	});

	it('should handle data without labels by using id instead', () => {
		const noLabelData = [
			{ id: 'a' },
			{ id: 'b', label: 'Hello' },
			{ id: 'hello-w' },
		];
		const sortedData = applyMelauto('hello', noLabelData);
		const expectedSortedData = [
			{ id: 'b', label: 'Hello' },
			{ id: 'hello-w' },
			{ id: 'a' },
		];
		expect(sortedData).toStrictEqual(expectedSortedData);
	});
});

describe('melautoScore', () => {
	it('should return a non-null score', () => {
		const score = melautoScore('Hello world', 'hello');
		const expectedScore = 1;
		expect(score).toBeCloseTo(expectedScore, 2);
	});

	it('should give a higher score for a closer match', () => {
		const score1 = melautoScore('Hello beautiful world', 'hello world');
		const score2 = melautoScore('Hello beautiful world', 'hello');
		expect(score1).toBeGreaterThan(score2);
	});

	it('should give the same score for a same query if the comparison string is longer', () => {
		const score1 = melautoScore('Hello world', 'hello');
		const score2 = melautoScore('Hello beautiful world', 'hello');
		expect(score1).toBeCloseTo(score2, 2);
	});

	it('should calculate a null score', () => {
		const score = melautoScore('Greetings planet', 'hello');
		const expectedScore = 0;
		expect(score).toBe(expectedScore);
	});

	it('should handle accent and special characters correctly', () => {
		const score1 = melautoScore('Héllo wörld', 'hello world');
		const score2 = melautoScore('Hello world', 'héllo-wOrld');
		expect(score1).toBeCloseTo(score2, 2);
	});

	it('should sort alphabetically with numeric awareness when scores are equal', () => {
		const numericData = [
			{ id: '0115Z', label: '0115Z' },
			{ id: '0111Z', label: '0111Z' },
			{ id: '0120A', label: '0120A' },
			{ id: '0112B', label: '0112B' },
		];
		const sortedData = applyMelauto('011', numericData);
		const expectedSortedData = [
			{ id: '0111Z', label: '0111Z' },
			{ id: '0112B', label: '0112B' },
			{ id: '0115Z', label: '0115Z' },
			{ id: '0120A', label: '0120A' },
		];
		expect(sortedData).toStrictEqual(expectedSortedData);
	});

	it('should preserve original order when scores are equal for text queries', () => {
		const textData = [
			{ id: '1', label: 'Hello world' },
			{ id: '2', label: 'Hello everyone' },
			{ id: '3', label: 'Hello friend' },
		];
		const sortedData = applyMelauto('hello', textData);
		const expectedSortedData = [
			{ id: '2', label: 'Hello everyone' },
			{ id: '3', label: 'Hello friend' },
			{ id: '1', label: 'Hello world' },
		];
		expect(sortedData).toStrictEqual(expectedSortedData);
	});

	it('should apply alphanumeric sort with numeric awareness', () => {
		const mixedData = [
			{ id: 'code10', label: 'code10' },
			{ id: 'code2', label: 'code2' },
			{ id: 'code20', label: 'code20' },
		];

		const sorted = applyMelauto('code', mixedData);
		// Should sort numerically: code2, code10, code20
		expect(sorted.map(d => d.id)).toStrictEqual(['code2', 'code10', 'code20']);
	});

	it('should handle mixed alphanumeric queries with numeric sorting', () => {
		const data = [
			{ id: 'item10B', label: 'item10B' },
			{ id: 'item2A', label: 'item2A' },
			{ id: 'item20C', label: 'item20C' },
			{ id: 'item3D', label: 'item3D' },
		];
		const sortedData = applyMelauto('item2', data);
		// "item2A" scores highest (exact match), others sorted alphanumerically
		expect(sortedData.map(d => d.id)).toStrictEqual(['item2A', 'item20C', 'item3D', 'item10B',]);
	});
});

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
	it('should sort data by relevance to the query', () => {
		const sortedData = applyMelauto('hello', data);
		const expectedSortedData = [
			{ id: '1', label: 'Hello world' },
			{ id: '3', label: 'Hello everyone' },
			{ id: '2', label: 'Bonjour le monde' },
			{ id: '4', label: 'Greetings planet' },
		];
		expect(sortedData).toStrictEqual(expectedSortedData);
	});

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
});
